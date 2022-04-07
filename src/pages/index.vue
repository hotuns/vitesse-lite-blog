<template>
  <h2>
    <span style="background: #0d342f; color: #d9c3ab;">成事不说，遂事不谏，既往不咎。</span>
  </h2>

  <div class="mt-8">
    <span>可以在这里找到我</span>
    <ul>
      <li v-for="i in list" :key="i.title">
        <a :href="i.url">{{ i.title }}</a>
      </li>
    </ul>
  </div>

  <ClientOnly>
    <Plum />
  </ClientOnly>
</template>

<script lang="ts" setup>

const list = [
  {
    title: '知乎',
    url: 'https://www.zhihu.com/people/bu-shi-dong-xi-9',
  },
  {
    title: 'GitHub',
    url: 'https://github.com/limeiwang',
  },
  {
    title: 'Email',
    url: 'mailto:hedongshu@foxmail.com',
  },
  {
    title: 'BiliBili',
    url: 'https://space.bilibili.com/39941520',
  },
]

</script>
