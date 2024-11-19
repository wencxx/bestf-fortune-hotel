<template>
    <div class="h-[10dvh] w-full flex justify-center px-[5dvw] z-50" :class="{ 'bg-gray-100': $route.name !== 'home' }">
        <div class="w-full max-w-6xl flex items-center justify-between">
            <router-link :to="{ name: 'home' }" class="!bg-transparent">
                <img src="../assets/277741668_347625477389163_2974931926985871192_n-removebg-preview.png" alt="logo" class="w-14 aspect-square">
            </router-link>
            <ul class="hidden lg:flex items-center gap-x-2 text-gray-200 font-inter font-medium tracking-wide uppercase text-sm" :class="{'!text-black': !isTargetVisible }">
                <li>
                    <router-link class="px-3 py-1 rounded" :to="{ name: 'home' }" :class="{'!text-black': $route.path !== '/' }">Home</router-link>
                </li>
                <li>
                    <router-link class="px-3 py-1 rounded" :to="{ name: 'rooms' }" :class="{'!text-black': $route.path !== '/' }">Rooms</router-link>
                </li>
                <li :class="{'!text-black': $route.path !== '/' }">
                    <router-link class="px-3 py-1 rounded" :to="{ name: 'about' }" :class="{'!text-black': $route.path !== '/' }">About</router-link>
                </li>
                <div class="ml-14">
                    <button v-if="!isAuth" class="!bg-custom-primary px-3 py-2 rounded text-white" @click="signIn">Sign in</button>
                    <div v-else class="relative flex items-center gap-x-2">
                        <p :class="{'!text-black': $route.path !== '/' }">Hi, {{ currentUser?.displayName.split(' ')[0] }}</p>
                        <button @click="showMenu = !showMenu">
                            <img v-if="currentUser?.photoURL" :src="currentUser?.photoURL" alt="profile picture" class="w-8 aspect-square rounded-full">
                            <div v-else class="bg-gray-100 w-8 aspect-square rounded-full capitalize flex items-center justify-center text-black">
                                <p>{{ currentUser?.displayName?.split('')[0] }}</p>
                            </div>
                        </button>
                        <div v-if="showMenu" class="absolute top-full rounded right-0 bg-gray-200 h-fit w-fit py-1 px-3 space-y-1">
                            <!-- <router-link :to="{ name: 'profile' }" class="text-black flex items-center gap-x-1 !bg-transparent"><Icon class="text-lg" icon="mdi:user-outline" />Profile</router-link> -->
                            <router-link :to="{ name: 'bookings' }" class="text-black flex items-center gap-x-1 !bg-transparent"><Icon class="text-lg" icon="material-symbols-light:book-outline" />Bookings</router-link>
                            <button class="text-black flex items-center gap-x-1" @click="logout"><Icon class="text-lg" icon="material-symbols-light:logout-rounded" />Logout</button>
                        </div>
                    </div>
                </div>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref, watch } from 'vue'
import { useAuthStore } from '../store'
import { auth } from '../config/firebaseConfig'
import { signOut } from 'firebase/auth' 
import { useRoute } from 'vue-router'

const route = useRoute()
const authStore = useAuthStore()
const isAuth = computed(() => authStore.isAuth)
const currentUser = computed(() => authStore.user)

const { isTargetVisible } = defineProps({
    isTargetVisible: Boolean
}) 

watch(route, () => {
    showMenu.value = false
})

const emit = defineEmits(['signIn'])

const signIn = () => {
    emit('signIn')
}

const logout = async () => {
    try {
        await signOut(auth)

        authStore.signout()
    } catch (error) {
        console.log(error)
    }
}
const showMenu = ref(false)
</script>
<style scope>
.router-link-active {
    background-color: #e5e7eb;
    color: black;
}
</style>
