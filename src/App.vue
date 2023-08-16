<template>
  <music></music>
  <router-view />
</template>

<script setup lang="ts">
import music from '@/components/music.vue'
document.title = import.meta.env.VITE_APP_TITLE
</script>

<style>
  #app,body,html{
    margin: 0;
    border: 0;
    height: 100%;
    width: 100%;
  }
</style>
