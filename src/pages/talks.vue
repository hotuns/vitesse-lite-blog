<template>
  <div class="prose m-auto mb-8 select-none">
    <h1 class="mb-0">
      <router-link to="/posts" class="opacity-20 hover:opacity-50 !border-none !font-400">
        文章
      </router-link>

      <span class="">生活</span>
    </h1>
  </div>

  <ListPosts type="life" />
</template>
