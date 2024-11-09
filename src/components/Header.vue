<template>
    <div class="h-[10dvh] w-full flex justify-center px-[5dvw]" :class="{ 'bg-gray-100': $route.name !== 'home' }">
        <div class="w-full max-w-6xl flex items-center justify-between">
            <img src="../assets/277741668_347625477389163_2974931926985871192_n-removebg-preview.png" alt="logo" class="w-14 aspect-square">
            <ul class="hidden lg:flex items-center gap-x-10 text-gray-200 font-inter font-medium tracking-wide uppercase text-sm" :class="{'!text-black': !isTargetVisible }">
                <li>
                    <router-link :to="{ name: 'home' }" :class="{'!text-black': $route.path !== '/' }">Home</router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'rooms' }" :class="{'!text-black': $route.path !== '/' }">Rooms</router-link>
                </li>
                <li :class="{'!text-black': $route.path !== '/' }">About</li>
                <li>
                    <router-link :to="{ name: 'rooms' }" class="bg-custom-primary px-3 py-2 rounded text-white">Book Now</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

const { isTargetVisible } = defineProps({
    isTargetVisible: Boolean
}) 
</script>'