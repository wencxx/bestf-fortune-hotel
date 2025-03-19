<template>
    <div class="fixed inset-0 bg-black/75 overflow-hidden !mt-0 flex items-center justify-center z-[1000] h-screen w-screen">
        <button @click="close" class="absolute top-5 right-5 text-white text-2xl">&times;</button> 
        <div class="relative h-1/2 lg:h-[80%] lg:aspect-square">
            <button @click="prevImage" class="absolute left-0 top-1/2 transform -translate-y-1/2 text-white text-2xl">&lt;</button>
            <img :src="images[currentIndex]" alt="Zoomed image" class="max-w-full h-full aspect-square">
            <button @click="nextImage" class="absolute right-0 top-1/2 transform -translate-y-1/2 text-white text-2xl">&gt;</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
    images: Array,
    startIndex: Number
})

const emit = defineEmits(['close'])

const currentIndex = ref(props.startIndex)

const close = () => {
    emit('close')
}

const prevImage = () => {
    currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length
}

const nextImage = () => {
    currentIndex.value = (currentIndex.value + 1) % props.images.length
}
</script>

<style scoped>
button {
    background: none;
    border: none;
    cursor: pointer;
}
</style>
