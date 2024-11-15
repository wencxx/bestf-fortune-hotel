<template>
    <div class="bg-black/10 w-screen h-screen backdrop-blur-sm flex items-center justify-center duration-500">
        <form @submit="signInUsingEmail" class="bg-white w-full relative max-w-sm rounded-md p-5 border h-fit flex flex-col space-y-5">
            <Icon icon="mdi:close" class="absolute right-5 top-5 text-2xl cursor-pointer" @click="closeModal" />
            <h1 class="text-center text-xl font-medium">Sign In</h1>
            <p v-if="err" class="!mt-8 bg-red-500 pl-2 rounded text-white">{{ err }}</p>
            <p v-if="$route.query.signInRequired" class="!mt-8 bg-red-500 pl-2 py-1 rounded text-white uppercase">Sign in first to start booking</p>
            <div class="flex flex-col gap-y-1">
                <label>Email</label>
                <input type="email" class="h-8 border rounded">
            </div>
            <div class="flex flex-col gap-y-1">
                <label>Password</label>
                <input type="password" class="h-8 border rounded">
            </div>
            <div class="!mt-0">
                <p class="space-x-1"><span>Don't have an account?</span> <button class="underline">Sign up</button></p>
            </div>
            <button class="bg-custom-primary rounded text-white py-1">Sign in</button>
            <p class="uppercase text-center font-medium">Or sign in using</p>
            <div class="flex items-center justify-center">
                <Icon icon="flat-color-icons:google" class="cursor-pointer  text-4xl" @click="signInWithGoogle" />
            </div>
        </form>
    </div>
</template>

<script setup>
import { defineEmits,ref } from 'vue'
import { auth, googleProvider, facebookProvider } from '../config/firebaseConfig'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { useAuthStore } from '../store'
import { useRouter } from 'vue-router'


const router = useRouter()
const authStore = useAuthStore()

const emit = defineEmits(['closeModal'])

const closeModal = () => {
    router.push({
        query: {}
    })
    emit('closeModal')
}

// sign in using email and password
const err = ref('')

const signInUsingEmail = async () => {
    try {
        const credentials = await signInWithEmailAndPassword(auth)

        const user = credentials.user

        authStore.login(user.accessToken, user)

        localStorage.setItem('isAuth', true)

        closeModal()
    } catch (error) {
        err.value = 'Failed to sign in'
        console.log(error)
    }
}

const signInWithGoogle = async () => {
    try {
        const credentials = await signInWithPopup(auth, googleProvider)

        const user = credentials.user;
        
        authStore.login(user.accessToken, user);
        localStorage.setItem('isAuth', true);

        closeModal();
    } catch (error) {
        console.log(error)
    }
}
</script>