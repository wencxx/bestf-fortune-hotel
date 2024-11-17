<template>
    <div class="fixed top-0 left-0 w-screen h-screen bg-black/10 z-50 flex items-center justify-center">
        <div class="w-full max-w-sm h-fit p-10 bg-white rounded-md shadow flex flex-col items-center gap-y-5">
            <Icon icon="mdi:warning" class="text-orange-500 text-7xl"  />
            <h1 class="font-medium text-neutral-700 text-3xl text-center">Room Not Available</h1>
            <button class="w-1/3 mt-3 bg-green-500 py-1 rouned text-white rounded" @click="emit('closeModal')">Ok</button>
        </div>
    </div>
</template>

<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['closeModal'])
</script>