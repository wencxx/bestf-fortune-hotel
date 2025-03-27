<template>
    <div class="bg-black/10 w-screen h-screen backdrop-blur-sm flex items-center justify-center duration-500">
        <form @submit.prevent="signUp" class="bg-white w-full relative max-w-lg rounded-md p-5 border h-fit flex flex-col space-y-5">
            <Icon icon="mdi:close" class="absolute right-5 top-5 text-2xl cursor-pointer" @click="closeModal" />
            <h1 class="text-center text-xl font-medium">Sign Up</h1>
            <p v-if="err" class="!mt-8 bg-red-500 pl-2 rounded text-white">{{ err }}</p>
            <div class="grid grid-cols-2 gap-5">
                <div class="flex flex-col gap-y-1">
                    <label>Firstname</label>
                    <input type="text" class="h-8 border rounded pl-2" v-model="userDetails.firstName" required>
                </div>
                <div class="flex flex-col gap-y-1">
                    <label>Lastname</label>
                    <input type="text" class="h-8 border rounded pl-2" v-model="userDetails.lastName" required>
                </div>
                <div class="flex flex-col gap-y-1">
                    <label>Email</label>
                    <input type="email" class="h-8 border rounded pl-2" v-model="userDetails.email" required>
                </div>
                <div class="flex flex-col gap-y-1">
                    <label>Phone Number</label>
                    <input type="number" class="h-8 border rounded pl-2" v-model="userDetails.phoneNumber" required>
                </div>
                <div class="flex flex-col gap-y-1 col-span-2">
                    <label>Address</label>
                    <input type="text" class="h-8 border rounded pl-2" v-model="userDetails.address" required>
                </div>
                <div class="flex flex-col gap-y-1">
                    <label>Password</label>
                    <input type="password" class="h-8 border rounded pl-2" v-model="userDetails.password" required>
                </div>
                <div class="flex flex-col gap-y-1">
                    <label>Confirm Password</label>
                    <input type="password" class="h-8 border rounded pl-2" v-model="userDetails.confirmPassword" required>
                </div>
            </div>
            <div class="!mt-0">
                <p class="space-x-1"><span>Already have an account?</span> <button class="underline" type="button" @click="emit('signIn')">Sign in</button></p>
            </div>
            <button v-if="!signingUp" class="bg-custom-primary rounded text-white py-1">Sign up</button>
            <button v-else class="bg-custom-primary rounded text-white py-1 animate-pulse" disabled>Signing up</button>
        </form>
    </div>
</template>

<script setup>
import { defineEmits, ref } from 'vue'
import { auth, db } from '../config/firebaseConfig'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { addDoc, collection } from "firebase/firestore"
import { useAuthStore } from '../store'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const emit = defineEmits(['closeModal', 'signIn'])

const userDetails = ref({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    password: '',
    confirmPassword: '',
})

const err = ref('')
const signingUp = ref(false)

const signUp = async () => {
    err.value = '' 
    try {
        signingUp.value = true
        if (userDetails.value.password !== userDetails.value.confirmPassword) {
            err.value = "Passwords don't match."
            return
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailPattern.test(userDetails.value.email)) {
            err.value = "Invalid email format."
            return
        }

        const userCredential = await createUserWithEmailAndPassword(
            auth,
            userDetails.value.email,
            userDetails.value.password
        )

        const user = userCredential.user

        await updateProfile(user, {
            displayName: `${userDetails.value.firstName} ${userDetails.value.lastName}`,
        })

        await addDoc(collection(db, "users"), {
            firstName: userDetails.value.firstName,
            lastName: userDetails.value.lastName,
            email: userDetails.value.email,
            phoneNumber: userDetails.value.phoneNumber,
            address: userDetails.value.address,
            userId: user.uid
        });

        router.push({
            query: {
                registered: true
            }
        })

        emit('signIn')
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            err.value = 'Email is already in use.'
        } else {
            err.value = 'An error occurred. Please try again.'
        }
        console.log(error)
    } finally {
        signingUp.value = false
    }
}

const closeModal = () => {
    router.push({
        query: {}
    })
    emit('closeModal')
}
</script>
