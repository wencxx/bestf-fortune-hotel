<template>
    <div class="min-h-[90dvh] bg-gray-100 py-10 !pb-20 px-10">
        <div class="flex flex-col items-center gap-y-20">
            <div class="border-b border-black w-fit mx-auto">
                <h1 class="text-3xl font-serif">Our Room</h1>
            </div>
            <div class="w-full max-w-6xl border">
                <div class="flex flex-col gap-y-5 p-5 lg:flex-row w-full bg-white lg:w-full h-fit lg:h-20 rounded font-light shadow overflow-hidden">
                    <div class="w-full border-b py-2 lg:border-b-0 lg:py-0 lg:w-1/4 flex flex-col lg:items-center lg:justify-center cursor-pointer">
                        <span class="text-lg font-medium">Check in</span>
                        <input type="date" id="checkin" :min="minDate" max="2025-12-31" class="text-sm cursor-pointer focus:outline-none" v-model="checkIn">
                    </div>
                    <div class="w-full border-b py-2 lg:border-b-0 lg:py-0 lg:w-1/4 flex flex-col lg:items-center lg:justify-center cursor-pointer">
                        <span class="text-lg font-medium">Check out</span>
                        <input type="date" id="checkin" :max="'2025-12-31'" class="text-sm cursor-pointer focus:outline-none" v-model="checkOut" :min="checkIn ? nextDay(checkIn) : minDate">
                    </div>
                    <div class="w-full border-b py-2 lg:border-b-0 lg:py-0 lg:w-1/4 flex flex-col lg:items-center lg:justify-center cursor-pointer">
                        <span class="text-lg font-medium">Guests</span>
                        <select class="border w-full h-8 lg:w-3/5 rounded pl-2 focus:outline-none" v-model="guests">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                        </select>
                    </div>
                    <button class="h-14 lg:h-full w-full lg:w-1/4 px-10 flex items-center justify-center bg-custom-primary text-white font-inter" @click="checkAvailability">
                        <span>Check Availability</span>
                    </button>
                </div>
            </div>
            <!-- rooms -->
            <div v-if="!loadingRooms && filteredRooms().length" class="w-full max-w-6xl grid md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
                <div v-for="(room, index) in filteredRooms()" :key="index" class="flex flex-col h-full rounded-t overflow-hidden shadow">
                    <!-- img -->
                    <div class="relative">
                        <img :src="room.thumbnailUrl" alt="deluxe" class="w-full aspect-video object-cover">
                        <p v-if="!hasAvailableRooms(room.id)" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-500 px-3 py-1 rounded text-white uppercase text-sm">Not available</p>
                        <div v-if="room.roomPromo" class="bg-red-500 py-5 px-2 w-fit text-white rounded-full absolute top-5 right-5">
                            <p class="font-bold text-2xl">-{{ room.roomPromo }}%</p>
                        </div>
                    </div>
                    <div class="flex flex-col gap-y-2 p-5 border h-full">
                        <h1 class="font-serif font-light tracking-wide text-2xl">{{ room.roomName }}</h1>
                        <h2 class="font-semibold"><span class="text-custom-primary text-xl font-serif">₱{{ room.roomPrice }}</span><span class="text-sm text-gray-500">/night</span></h2>
                        <div class="space-y-3 mt-2">
                            <div class="flex font-inter text-sm text-gray-500">
                                <h1 class="w-1/2">Size:</h1>
                                <p class="w-1/2">{{ room.roomSize }}</p>
                            </div>
                            <div class="flex font-inter text-sm text-gray-500">
                                <h1 class="w-1/2">Capacity:</h1>
                                <p class="w-1/2">Max Person {{ room.roomCapacity }}</p>
                            </div>
                            <div class="flex font-inter text-sm text-gray-500">
                                <h1 class="w-1/2">Bed:</h1>
                                <p class="w-1/2">{{ room.roomBed }}</p>
                            </div>
                            <div class="flex font-inter text-sm text-gray-500">
                                <h1 class="w-1/2">Bathroom:</h1>
                                <p class="w-1/2">{{ room.roomBathroom }}</p>
                            </div>
                            <div v-if="room.keyFeatures" class="flex font-inter text-sm text-gray-500">
                                <h1 class="w-1/2">Key Features:</h1>
                                <p class="w-1/2">{{ room.roomKeyFeature }}</p>
                            </div>
                        </div>
                        <div class="mt-auto flex justify-end gap-x-3">
                            <router-link :to="{ name: 'roomDetails', params: { id: room.id } }" class="border border-custom-primary text-center !bg-transparent !text-custom-primary w-1/3 py-1 uppercase rounded hover:shadow">Details</router-link>
                            <button class="bg-custom-primary w-1/3 py-1 text-white uppercase rounded hover:shadow" @click="bookRoom(room.id, room.roomCapacity)">Book</button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else-if="!loadingRooms && !filteredRooms.length">
                <p class="text-lg uppercase font-inter">No available rooms</p>
            </div>
            <div v-else-if="loadingRooms" class="w-full max-w-6xl grid md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
                <div v-for="i in 6" :key="i" class="flex flex-col h-full rounded-t overflow-hidden shadow">
                    <!-- img -->
                    <div>
                        <div class="w-full aspect-video object-cover bg-gray-200 animate-pulse">

                        </div>
                    </div>
                    <div class="flex flex-col gap-y-2 p-5 border h-full">
                        <div class="h-10 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                        <div class="h-10 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                        <div class="space-y-3 mt-2">
                            <div class="flex font-inter text-sm text-gray-500">
                                <div class="w-1/2 h-6 bg-gray-200 animate-pulse rounded"></div>
                                <div class="w-1/2 h-6 bg-gray-200 animate-pulse rounded"></div>
                            </div>
                            <div class="flex font-inter text-sm text-gray-500">
                                <div class="w-1/2 h-6 bg-gray-200 animate-pulse rounded"></div>
                                <div class="w-1/2 h-6 bg-gray-200 animate-pulse rounded"></div>
                            </div>
                            <div class="flex font-inter text-sm text-gray-500">
                                <div class="w-1/2 h-6 bg-gray-200 animate-pulse rounded"></div>
                                <div class="w-1/2 h-6 bg-gray-200 animate-pulse rounded"></div>
                            </div>
                            <div class="flex font-inter text-sm text-gray-500">
                                <div class="w-1/2 h-6 bg-gray-200 animate-pulse rounded"></div>
                                <div class="w-1/2 h-6 bg-gray-200 animate-pulse rounded"></div>
                            </div>
                            <div class="flex font-inter text-sm text-gray-500">
                                <div class="w-1/2 h-6 bg-gray-200 animate-pulse rounded"></div>
                                <div class="w-1/2 h-6 bg-gray-200 animate-pulse rounded"></div>
                            </div>
                        </div>
                        <div class="mt-auto flex justify-end gap-x-3">
                            <div class="w-1/3 h-6 bg-gray-200 animate-pulse rounded"></div>
                            <div class="w-1/3 h-6 bg-gray-200 animate-pulse rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="noBookingDetails" class="fixed top-0 left-0 w-screen h-screen bg-black/25 z-[1000] flex items-center justify-center">
            <div class="bg-white w-full max-w-sm p-5 h-fit rounded-md font-inter space-y-3">
                <h1 class="text-center text-xl capitalize mb-2">Enter booking details</h1>
                <p v-if="passGuestsLimit" class="bg-red-500 pl-2 py-1 text-white rounded">Guests capacity exceeds</p>
                <div class="flex flex-col gap-y-1">
                    <label>Check In</label>
                    <input type="date" :min="minDate" max="2025-12-31" class="h-8 px-2 rounded border" v-model="checkIn">
                </div>
                <div class="flex flex-col gap-y-1">
                    <label>Check Out</label>
                    <input type="date" :min="checkIn ? nextDay(checkIn) : minDate" max="2025-12-31" class="h-8 px-2 rounded border" v-model="checkOut">
                </div>
                <div class="flex flex-col gap-y-1">
                    <label>Guests</label>
                    <input
                        type="number"
                        class="h-8 px-2 rounded border"
                        min="1"
                        max="9"
                        v-model.number="guests"
                        @input="onGuestsInput"
                    >
                </div>
                <div class="flex justify-end gap-x-2">
                    <button class="w-1/3 border border-custom-primary text-custom-primary rounded" @click="noBookingDetails = false">Cancel</button>
                    <button class="w-1/3 bg-custom-primary text-white rounded" @click="bookRoom(roomIdToBook)">Book</button>
                </div>
            </div>
        </div>

        <roomNotAvailableModal v-if="isNotRoomAvailable" @closeModal="isNotRoomAvailable = false" />
    </div>
</template>

<script setup>
import roomNotAvailableModal from '../components/RoomNotAvailable.vue'
import { computed, onMounted, ref, defineEmits } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { db } from '../config/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import { useAuthStore } from '../store'

const authStore = useAuthStore()
const isAuth = computed(() => authStore.isAuth)

const emit = defineEmits(['signIn'])

onMounted(() => {
    getRoomTypes()
    getRooms()
})

const route = useRoute()
const router = useRouter()

const minDate = new Date().toISOString().split('T')[0]

const checkIn = ref(route.query.checkIn || '')
const checkOut = ref(route.query.checkOut || '')
const guests = ref(route.query.guests || '')

const checkingAvailabity = ref(false)

const checkAvailability = () => {
    router.push({
        query: {
            checkIn: checkIn.value,
            checkOut: checkOut.value,
            guests: guests.value
        }
    })
}

// room type lists
const loadingRooms = ref(false)
const rooms = ref([])

const getRoomTypes = async () => {
    try {
        loadingRooms.value = true
        const snapshots = await getDocs(
            collection(db, 'rooms')
        )

        snapshots.docs.forEach(doc => {
            rooms.value.push({
                id: doc.id,
                ...doc.data()
            })
        })
    } catch (error) {
        console.log(error)
    } finally {
        loadingRooms.value = false
    }
}

const filteredRooms = () => {
    if(!route.query.guests ) return rooms.value

    const roomsFiltered = rooms.value.filter(room => room.roomCapacity >= route.query.guests && room.isAvailable )

    return roomsFiltered
}

// get room numbers
const roomNumbers = ref([])
const getRooms = async () => {
    try {
        const snapshots = await getDocs(
            collection(db, 'roomNumbers')
        )

        snapshots.docs.forEach(doc => {
            roomNumbers.value.push({
                id: doc.id,
                ...doc.data()
            })
        })
    } catch (error) {
        console.log(error)
    }
}

const hasAvailableRooms = (roomType) => {
    const room = roomNumbers.value.filter(room => room.roomType === roomType && room.roomStatus === 'Available')

    if(room.length) return true

    return false
}

// book room 
const isNotRoomAvailable = ref(false)
const noBookingDetails = ref(false)
const roomIdToBook = ref('')
const roomCapacityToBook = ref('')

const bookRoom = (roomId, roomCapacity) => {
    roomIdToBook.value = roomId
    roomCapacityToBook.value = roomCapacity
    
    if(!hasAvailableRooms(roomId)) return isNotRoomAvailable.value = true
    if(passGuestsLimit.value) return

    if(!isAuth.value) {
        emit('signIn')
        router.push({
            query: {
                signInRequired: true
            }
        })
        return
    }

    if(!guests.value || !checkIn.value || !checkOut.value){
        noBookingDetails.value = true
        return
    }

    router.push({
        name: 'checkOut',
        query: {
            id: roomId,
            checkIn: checkIn.value,
            checkOut: checkOut.value,
            guests: guests.value,
        }
    })
}

// check guests limit
const passGuestsLimit = ref(false)
const checkGuests = () => {
    if(guests.value > roomCapacityToBook.value){
        passGuestsLimit.value = true
    }else{
        passGuestsLimit.value = false
    }
}

// Clamp guests input between 1 and 9
const onGuestsInput = () => {
    if (guests.value === '' || guests.value === null) return
    if (guests.value < 1) guests.value = 1
    if (guests.value > 9) guests.value = 9
    checkGuests()
}

// Helper to get next day string in yyyy-mm-dd
function nextDay(dateStr) {
    const d = new Date(dateStr)
    d.setDate(d.getDate() + 1)
    return d.toISOString().split('T')[0]
}
</script>