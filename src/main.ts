import { ViteSSG } from 'vite-ssg'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import NProgress from 'nprogress'
import type { RouterScrollBehavior } from 'vue-router'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat.js'

import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import './styles/prose.css'
import './styles/markdown.css'
import 'uno.css'

const routes = setupLayouts(generatedRoutes)

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (savedPosition)
    return savedPosition
  else
    return { top: 0 }
}

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL, scrollBehavior },
  (ctx) => {
    dayjs.extend(LocalizedFormat)

    if (ctx.isClient) {
      ctx.router.beforeEach(() => { NProgress.start() })
      ctx.router.afterEach(() => { NProgress.done() })
    }
  },
)
