<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component"/>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
document.title = '幸运大转盘'
</script>

<style>
#app, body, html {
  margin: 0;
  border: 0;
  height: 100%;
  width: 100%;
}
</style>
