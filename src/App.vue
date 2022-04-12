<template>
  <NavBar />
  <main class="px-7 py-10">
    <article>
      <router-view />
    </article>
    <Footer />
  </main>
</template>

<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'HDS BLOG',
  meta: [
    { name: 'HDS BLOG', content: 'To keep track of things' },
  ],
})
</script>
