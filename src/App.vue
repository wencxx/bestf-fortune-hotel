<template>
  <div class="relative h-screen">
    <div class="hero h-[80dvh] w-screen bg-cover bg-center bg-no-repeat absolute top-0 left-0"></div>
    <Header class="sticky top-0" />
    <router-view class="relative" />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
</script>

<style scoped>
.hero {
  background-image: url('../src/assets/e77d83b6b413fcd4afe538137cb6a2bb.jpg');
}
</style>
