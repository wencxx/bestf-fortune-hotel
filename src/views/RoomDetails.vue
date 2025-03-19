<template>
    <div class="bg-gray-100">
        <div class="w-full max-w-6xl mx-auto min-h-[90dvh] space-y-5">
            <div class="relative">
                <img :src="roomDetails.thumbnailUrl" alt="" class="aspect-video">
                <div class="absolute top-0 left-0 bg-black/10 w-full h-full"></div>
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[90%] border border-white flex items-end p-5">
                    <h1 class="text-4xl font-serif text-white">{{ roomDetails.roomName }}</h1>
                </div>
                <div class="hidden lg:flex items-center justify-center bg-white w-fit h-fit p-3 absolute left-1/2 translate-x-1/2 top-1/2 translate-y-1/2 mt-10 shadow rounded-md">
                    <div class="w-fit h-fit p-5 border flex flex-col gap-y-5 items-center border-custom-primary rounded">
                        <h1 class="font-serif text-lg">Book This Room</h1>
                        <div class="flex gap-x-5">
                            <div class="flex flex-col items-center">
                                <Icon icon="majesticons:phone-retro-line" class="text-2xl text-custom-primary" />
                                <p>+9638806212</p>
                            </div>
                            <div class="flex flex-col items-center">
                                <Icon icon="ic:outline-email" class="text-2xl text-custom-primary" />
                                <p>bfh@gmail.com</p>
                            </div>
                        </div>
                        <div class="flex flex-col gap-y-2 items-center">
                            <p class="text-center">Follow Us & share your experience.</p>
                            <div class="flex items-center gap-x-2">
                                <a href="https://www.facebook.com/BestFortuneHotel" target="_blank"><Icon icon="ant-design:facebook-filled" class="text-2xl text-blue-500" /></a>
                                <Icon icon="skill-icons:instagram" class="text-xl mt-0.5" />
                            </div>
                        </div>
                        <router-link :to="{ name: 'rooms' }" class="bg-custom-primary text-white w-3/4 py-1 rounded text-center">Book Now</router-link>
                    </div>
                </div>
            </div>
            <div class="w-full p-5 text-center lg:text-justify lg:w-1/2 font-inter text-gray-500 text-sm tracking-wide">
                <p>{{ roomDetails.roomKeyFeatures }}</p>
            </div>
            <div class="h-fit w-full flex flex-col items-center gap-y-14 p-10 bg-gray-100">
                <h1 class="font-serif text-2xl font-medium border-b-2 border-custom-primary">Room Amenities</h1>
                <div class="grid md:grid-cols-2 lg:grid-cols-4 w-full max-w-6xl">
                    <div class="w-full h-48 flex flex-col items-center p-5 space-y-4">
                        <Icon icon="ion:bed-outline" class="text-4xl text-custom-primary" />
                        <h1 class="text-xl">Bed</h1>
                        <p class="text-center  text-gray-500">{{ roomDetails.roomBed }}</p>
                    </div>
                    <div class="w-full h-48 flex flex-col items-center p-5 space-y-4">
                        <Icon icon="material-symbols:wifi"  class="text-4xl text-custom-primary" />
                        <h1 class="text-xl">Internet Connection</h1>
                        <p class="text-center  text-gray-500">Free Wi-Fi in all rooms</p>
                    </div>
                    <div class="w-full h-48 flex flex-col items-center p-5 space-y-4">
                        <Icon icon="solar:bath-linear"  class="text-4xl text-custom-primary" />
                        <h1 class="text-xl">Bathroom</h1>
                        <p class="text-center  text-gray-500">{{ roomDetails.roomBathroom }}</p>
                    </div>
                    <div class="w-full h-48 flex flex-col items-center p-5 space-y-4">
                        <Icon icon="mingcute:air-condition-open-fill"  class="text-4xl text-custom-primary" />
                        <h1 class="text-xl">Air Conditioning</h1>
                        <p class="text-center  text-gray-500">Fully air-conditioned room</p>
                    </div>
                </div>
            </div>
            <div v-if="roomDetails?.imagesUrls?.length" class="h-fit w-full flex flex-col items-center gap-y-14 p-10 bg-gray-100">
                <h1 class="font-serif text-2xl font-medium border-b-2 border-custom-primary">Room Images</h1>
                <div class="grid grid-cols-4 gap-2">
                    <div v-for="(image, index) in roomDetails.imagesUrls" :key="image" @click="openImageViewer(index)">
                        <img :src="image" alt="room image" class="w-full aspect-square rounded cursor-pointer">
                    </div>
                </div>
            </div>
            <ImageViewer v-if="isViewerOpen" :images="roomDetails.imagesUrls" :startIndex="currentImageIndex" @close="closeImageViewer" />
        </div>
    </div>
</template>

<script setup>
import { db } from '../config/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import ImageViewer from '../components/ImageViewer.vue' // Import the ImageViewer component

const route = useRoute()

onMounted(() => {
    getRoomDetails()
})

// getDocs
const roomDetails = ref({})
const isViewerOpen = ref(false)
const currentImageIndex = ref(0)

const getRoomDetails = async () => {
    try {
        const snapshot = await getDoc(doc(db, 'rooms', route.params.id))

        roomDetails.value = {
            id: snapshot.id,
            ...snapshot.data()
        }
    } catch (error) {
        console.log(error)
    }
}

const openImageViewer = (index) => {
    currentImageIndex.value = index
    isViewerOpen.value = true
}

const closeImageViewer = () => {
    isViewerOpen.value = false
}
</script>