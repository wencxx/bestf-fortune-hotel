<template>
  <div class="relative h-screen min-w-3/4 overflow-x-hidden">
    <div class="hero h-[100dvh] w-screen bg-cover bg-center bg-no-repeat absolute top-0 left-0 -z-10" ref="target"></div>
    <div class="absolute left-0 top-0 w-screen h-[100dvh] bg-black/35 -z-10"></div>
    <Header class="sticky top-0" :isTargetVisible="targetIsVisible" @signIn="willSignIn = true" />
    <router-view @signIn="willSignIn = true"/>
    <Footer v-if="$route.name !== 'checkOut' && $route.name !== 'profile' && $route.name !== 'profileInfo' && $route.name !== 'bookings'" />
    <Login class="fixed top-0 left-0" v-if="willSignIn" @closeModal="willSignIn = false" @signUp="signUp" />
    <Signup class="fixed top-0 left-0" v-if="willSignUp" @closeModal="willSignUp = false" @signIn="signIn" />
    <div class="fixed bottom-10 right-10">
        <div v-if="showChat" class="w-96 h-96 bg-white border rounded">
            <div class="border-b h-1/6 flex items-center justify-between p-3">
                <div class="flex items-center gap-x-2">
                    <div class="px-2 py-2 rounded-full bg-gray-200">
                      <Icon icon="bx:bot" class="text-3xl" />
                    </div>
                    <p class="font-medium text-lg">BFH Chat Bot</p>
                </div>
                <Icon icon="mdi:close" class="text-2xl cursor-pointer" @click="showChat = false" />
            </div>
        </div>
        <Icon v-else icon="fluent:chat-32-filled" class="text-6xl text-blue-500 cursor-pointer" @click="showChat = true" />
    </div>
  </div>
</template>

<script setup>
import Login from './components/Login.vue'
import Signup from './components/Signup.vue'
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

// show chatbot
const showChat = ref(false)

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

const willSignUp = ref(false)

const signUp = () => {
  willSignIn.value = false
  willSignUp.value = true
}

const signIn = () => {
  willSignUp.value = false
  willSignIn.value = true
}
</script>

<style scoped>
.hero {
  background-image: url('../src/assets/e77d83b6b413fcd4afe538137cb6a2bb.jpg');
}
</style>
