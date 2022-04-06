import { ViteSSG } from 'vite-ssg'
import generatedRoutes from 'virtual:generated-pages'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import NProgress from 'nprogress'

import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const routes = generatedRoutes

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    dayjs.extend(LocalizedFormat)

    if (ctx.isClient) {
      ctx.router.beforeEach(() => { NProgress.start() })
      ctx.router.afterEach(() => { NProgress.done() })
    }
  },
)
