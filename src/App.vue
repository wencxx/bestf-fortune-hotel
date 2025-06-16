<template>
  <div v-if="route.name === 'payment'">
    <router-view />
  </div>
  <div v-else class="relative min-w-3/4 overflow-x-hidden">
    <div
      class="hero h-[100dvh] w-screen bg-cover bg-center bg-no-repeat absolute top-0 left-0 -z-10"
      ref="target"
    ></div>
    <div
      class="absolute left-0 top-0 w-screen h-[100dvh] bg-black/35 -z-10"
    ></div>
    <Header
      class="fixed top-0"
      :scrolled="scrolled"
      :isTargetVisible="targetIsVisible"
      @signIn="willSignIn = true"
    />
    <router-view @signIn="willSignIn = true" />
    <Footer
      v-if="
        $route.name !== 'checkOut' &&
        $route.name !== 'profile' &&
        $route.name !== 'profileInfo' &&
        $route.name !== 'bookings'
      "
    />
    <Login
      class="fixed top-0 left-0"
      v-if="willSignIn"
      @closeModal="willSignIn = false"
      @signUp="signUp"
    />
    <Signup
      class="fixed top-0 left-0"
      v-if="willSignUp"
      @closeModal="willSignUp = false"
      @signIn="signIn"
    />
    <!-- Add this div to force scroll for testing -->
  </div>
</template>

<script setup>
import Login from "./components/Login.vue";
import Signup from "./components/Signup.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { ref, onMounted, onUnmounted } from "vue";
import { useIntersectionObserver } from "@vueuse/core";
import { auth } from "./config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthStore } from "./store";
import { useRoute } from "vue-router";
const route = useRoute();

const authStore = useAuthStore();

const willSignIn = ref(false);

const target = ref(null);
const targetIsVisible = ref(false);

useIntersectionObserver(target, ([{ isIntersecting }], observerElement) => {
  targetIsVisible.value = isIntersecting;
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    authStore.user = user;
  }
});

const willSignUp = ref(false);

const signUp = () => {
  willSignIn.value = false;
  willSignUp.value = true;
};

const signIn = () => {
  willSignUp.value = false;
  willSignIn.value = true;
};

const scrolled = ref(false);

const handleScroll = () => {
  scrolled.value = window.scrollY > 0;
  console.log(scrolled.value);
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.hero {
  background-image: url("../src/assets/newbg.jpg");
}
</style>
