<script setup lang='ts'>
import { formatDate } from '~/composables'
import type { frontmatter } from '~/types'

const router = useRouter()
const route = useRoute()
const content = ref<HTMLElement>()

const matter = computed(() => {
  return route.meta.frontmatter as frontmatter
})

onMounted(() => {
  const navigate = () => {
    if (location.hash) {
      document.querySelector(decodeURIComponent(location.hash))
        ?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleAnchors = (
    event: MouseEvent & { target: HTMLElement },
  ) => {
    const link = event.target.closest('a')

    if (
      !event.defaultPrevented
      && link
      && event.button === 0
      && link.target !== '_blank'
      && link.rel !== 'external'
      && !link.download
      && !event.metaKey
      && !event.ctrlKey
      && !event.shiftKey
      && !event.altKey
    ) {
      const url = new URL(link.href)
      if (url.origin !== window.location.origin)
        return

      event.preventDefault()
      const { pathname, hash } = url
      if (hash && (!pathname || pathname === location.pathname)) {
        window.history.replaceState({}, '', hash)
        navigate()
      }
      else {
        router.push({ path: pathname, hash })
      }
    }
  }

  useEventListener(window, 'hashchange', navigate)
  useEventListener(content.value!, 'click', handleAnchors, { passive: false })

  navigate()
  setTimeout(navigate, 500)
})

</script>

<template>
  <div v-if="matter.title" class="prose m-auto mb-8">
    <h1 class="mb-0">{{ matter.title }}</h1>
    <p v-if="matter.date" class="opacity-50 !-mt-2">{{ formatDate(matter.date) }}</p>
  </div>

  <article ref="content">
    <router-view />
  </article>

  <div class="prose m-auto mt-8 mb-8 cursor-pointer">
    <a class="font-mono no-underline opacity-50 hover:opacity-75" @click="router.back()">cd ..</a>
  </div>
</template>
