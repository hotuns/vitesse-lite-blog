/// <reference types="vitest" />

import { resolve } from 'path'
import * as fs from 'fs'
import { defineConfig } from 'vite'
import generateSitemap from 'vite-ssg-sitemap'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import Inspect from 'vite-plugin-inspect'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Markdown from 'vite-plugin-md'
import Prism from 'markdown-it-prism'
import LinkAttributes from 'markdown-it-link-attributes'
import { VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'
import matter from 'gray-matter'
// @ts-expect-error missing types
import TOC from 'markdown-it-table-of-contents'
import anchor from 'markdown-it-anchor'
import { slugify } from './scripts/slugify'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true,
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      dirs: [
        { dir: 'src/pages', baseRoute: '' },
        { dir: 'post', baseRoute: 'post' },
      ],
      extensions: ['vue', 'md'],
      extendRoute(route) {
        if (route.name && route.component.startsWith('/post/')) {
          const path = resolve(__dirname, route.component.slice(1))
          const md = fs.readFileSync(path, 'utf-8')
          const { data } = matter(md)

          if (!data.type)
            data.type = 'blog'

          route.meta = Object.assign(route.meta || {}, { frontmatter: data, layout: 'post' })
          route.path = encodeURI(route.path)
        }

        return route
      },
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        'vue-router',
        '@vueuse/core',
        '@vueuse/head',
      ],
      dts: true,
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: true,
      resolvers: [
        IconsResolver(),
        VueUseComponentsResolver(),
      ],
    }),

    // https://github.com/antfu/vite-plugin-md
    // Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
    Markdown({
      wrapperClasses: 'prose m-auto',
      headEnabled: true,
      markdownItOptions: {
        quotes: '""\'\'',
      },
      markdownItSetup(md) {
        // https://prismjs.com/
        md.use(Prism)

        md.use(LinkAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })

        md.use(anchor, {
          slugify,
          permalink: anchor.permalink.linkInsideHeader({
            symbol: '#',
            renderAttrs: () => ({ 'aria-hidden': 'true' }),
          }),
        })

        md.use(TOC, {
          includeLevel: [1, 2, 3],
          slugify,
        })
      },
    }),

    // https://icones.netlify.app/
    Icons({
      autoInstall: true,
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),

    // https://github.com/antfu/vite-plugin-inspect
    // Visit http://localhost:3333/__inspect/ to see the inspector
    Inspect(),
  ],

  // https://github.com/antfu/vite-ssg
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    onFinished() { generateSitemap() },
  },

  // https://github.com/vitest-dev/vitest
  test: {
    environment: 'jsdom',
  },
})
