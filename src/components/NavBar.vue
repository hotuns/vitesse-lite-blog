<script setup lang="ts">
</script>

<template>
  <header class="header z-40">
    <router-link class="w-10 h-10 absolute lg:fixed m-6 select-none outline-none" to="/" focusable="false">
      <div class="text-2xl" i-carbon-bat />
    </router-link>
    <nav class="nav">
      <div class="spacer" />
      <div class="right">
        <router-link to="/posts">
          <span class="lt-md:hidden">文章</span>
          <i-carbon-catalog class="md:hidden" />
        </router-link>
        <router-link to="/talks">
          <span class="lt-md:hidden">生活</span>
          <i-carbon-catalog class="md:hidden" />
        </router-link>
        <router-link to="/projects">
          <span class="lt-md:hidden">项目</span>
          <i-carbon-list-bulleted class="md:hidden" />
        </router-link>
        <router-link to="/bookmarks" title="书签" class="lt-md:hidden">
          <i-carbon-bookmark />
        </router-link>
        <a href="https://github.com/hedongshu" target="_blank" title="GitHub">
          <i-carbon-logo-github />
        </a>
        <!-- <a href="/feed.xml" target="_blank" title="RSS" class="lt-md:hidden">
          <la-rss-square style="font-size:1.25rem; margin: 0 -0.125rem;" />
        </a>-->
        <toggle-theme />
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header h1 {
  margin-bottom: 0;
}

.logo {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
}

.nav {
  padding: 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: auto max-content;
  box-sizing: border-box;
}

.nav>* {
  margin: auto;
}

.nav img {
  margin-bottom: 0;
}

.nav a {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease;
  opacity: 0.6;
  outline: none;
}

.nav a:hover {
  opacity: 1;
  text-decoration-color: inherit;
}

.nav .right {
  display: grid;
  grid-gap: 1.2rem;
  grid-auto-flow: column;
}

.nav .right>* {
  margin: auto;
}
</style>
