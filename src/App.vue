<template>
  <div class="relative h-screen min-w-3/4 overflow-x-hidden">
    <div class="hero h-[100dvh] w-screen bg-cover bg-center bg-no-repeat absolute top-0 left-0 -z-10" ref="target"></div>
    <div class="absolute left-0 top-0 w-screen h-[100dvh] bg-black/35 -z-10"></div>
    <Header class="sticky top-0" :isTargetVisible="targetIsVisible" @signIn="willSignIn = true" />
    <router-view @signIn="willSignIn = true"/>
    <Footer v-if="$route.name !== 'checkOut' && $route.name !== 'profile' && $route.name !== 'profileInfo' && $route.name !== 'bookings'" />
    <Login class="fixed top-0 left-0" v-if="willSignIn" @closeModal="willSignIn = false" @signUp="signUp" />
    <Signup class="fixed top-0 left-0" v-if="willSignUp" @closeModal="willSignUp = false" @signIn="signIn" />
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


const FAQS = ref([
  {
    question: 'What types of rooms are available?',
    answer: 'We offer a variety of room types to suit different preferences, including [list room types, e.g., standard, deluxe, suites]. Each room is designed for your comfort and convenience.'
  },
  {
    question: 'Do the rooms have Wi-Fi?',
    answer: 'Yes, all rooms and public areas in our hotel are equipped with complimentary Wi-Fi for your convenience.'
  },
  {
    question: 'What amenities are available at the hotel?',
    answer: 'While we don’t currently offer additional on-site amenities, our focus is on providing clean, comfortable, and affordable accommodations.'
  },
  {
    question: 'Do you provide room service?',
    answer: 'Yes, room service is available during [insert specific hours, e.g., 7:00 AM to 10:00 PM]. Enjoy a selection of meals and snacks delivered directly to your room.'
  },
  {
    question: 'Do you have on-site restaurants?',
    answer: 'We do not have an on-site restaurant, but there are several excellent dining options within walking distance of the hotel. Our staff will be happy to recommend nearby restaurants.'
  },
  {
    question: 'What safety measures are in place at the hotel?',
    answer: 'Your safety is our priority. Our hotel is equipped with [list safety features, e.g., 24/7 security, CCTV surveillance, and smoke detectors].'
  },
  {
    question: 'What should I do in case of an emergency?',
    answer: 'Please contact the front desk immediately for assistance. Evacuation routes and emergency instructions are clearly displayed in every room for your reference.'
  }
])
</script>

<style scoped>
.hero {
  background-image: url('../src/assets/e77d83b6b413fcd4afe538137cb6a2bb.jpg');
}
</style>
