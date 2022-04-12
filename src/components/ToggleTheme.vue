<template>
  <a class="select-none" title="切换主题" @click="toggleDark">
    <i-carbon-moon v-show="isDark" />
    <i-carbon-sun v-show="!isDark" />
  </a>
</template>

<script setup lang='ts'>
import { isDark } from '~/composables'

function toggleDark() {
  isDark.value = !isDark.value
}
</script>
