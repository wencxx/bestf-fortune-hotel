<template>
  <div class="relative h-screen min-w-3/4 overflow-x-hidden">
    <div class="hero h-[100dvh] w-screen bg-cover bg-center bg-no-repeat absolute top-0 left-0 -z-10" ref="target"></div>
    <div class="absolute left-0 top-0 w-screen h-[100dvh] bg-black/35 -z-10"></div>
    <Header class="sticky top-0" :isTargetVisible="targetIsVisible" @signIn="willSignIn = true" />
    <router-view @signIn="willSignIn = true"/>
    <Footer v-if="$route.name !== 'checkOut' && $route.name !== 'profile' && $route.name !== 'profileInfo' && $route.name !== 'bookings'" />
    <Login class="fixed top-0 left-0" v-if="willSignIn" @closeModal="willSignIn = false" />
  </div>
</template>

<script setup>
import Login from './components/Login.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { auth } from './config/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { useAuthStore } from './store'

const authStore = useAuthStore()

const willSignIn = ref(false)

const target = ref(null)
const targetIsVisible = ref(false)

useIntersectionObserver(
  target,
  ([{ isIntersecting }], observerElement) => {
    targetIsVisible.value = isIntersecting
  },
)

onAuthStateChanged(auth, (user) => {
  if(user){
    authStore.user = user
  }
})
</script>

<style scoped>
.hero {
  background-image: url('../src/assets/e77d83b6b413fcd4afe538137cb6a2bb.jpg');
}
</style>
