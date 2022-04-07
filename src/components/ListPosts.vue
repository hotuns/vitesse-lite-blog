<script setup lang="ts">
import { useRouter } from 'vue-router'
import { formatDate } from '~/composables'
import type { MyRouteRecordNormalized } from '~/types'

const props = defineProps<{
  type?: string
}>()

const router = useRouter()
const route = useRoute()

let routes = (router.getRoutes() as MyRouteRecordNormalized[])
routes = routes
  .filter(i => i.name && i.path.startsWith('/post/') && i.meta.frontmatter && i.meta.frontmatter.date)
  .sort((a, b) => +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date))

const posts = computed(() =>
  routes.filter(i => !i.path.endsWith('.html') && i.meta.frontmatter.type === props.type),
)

</script>

<template>
  <template v-if="!posts.length">
    <div py2 op50>{ nothing here yet }</div>
  </template>
  <ul>
    <app-link
      v-for="route in posts"
      :key="route.path"
      class="item block font-normal mb-6 mt-2 no-underline"
      :to="route.path"
    >
      <li class="no-underline">
        <div class="title text-lg">
          {{ route.meta.frontmatter.title }}
          <!-- <sup
            v-if="route.meta.frontmatter.lang === 'zh'"
            class="text-xs border border-current rounded px-1 pb-0.2"
          >中文</sup>-->
        </div>
        <div class="time opacity-50 text-sm -mt-1">{{ formatDate(route.meta.frontmatter.date) }}</div>
      </li>
    </app-link>
  </ul>

  <div v-if="route.path !== '/'" class="prose m-auto mt-8 mb-8">
    <router-link
      :to="route.path.split('/').slice(0, -1).join('/') || '/'"
      class="font-mono no-underline opacity-50 hover:opacity-75"
    >cd ..</router-link>
  </div>
</template>
