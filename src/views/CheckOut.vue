<template>
    <div class="min-h-[90dvh] bg-gray-100 py-10 !pb-20 px-10 flex items-center justify-center">
        <div class="w-full max-w-6xl flex my-auto rounded-xl p-5 bg-white h-fit gap-10 font-inter">
            <form @submit.prevent="checkOut" class="w-3/5 space-y-3">
                <div v-if="err" class="w-full h-fit py-2 bg-custom-primary/45 rounded-md flex items-center pl-5 border border-red-200">
                    <h1 class="font-inter text-sm">Fill out all required fields</h1>
                </div>
                <div v-if="failedCheckingOut" class="w-full h-fit py-2 bg-custom-primary/45 rounded-md flex items-center pl-5 border border-red-200">
                    <h1 class="font-inter text-sm">Failed checking out. Try again later</h1>
                </div>
                <h1 class="font-inter text-xl font-semibold">Secure Checkout</h1>
                <div class="w-full h-fit py-3 bg-custom-secondary/15 rounded-md flex items-center pl-5 border border-yellow-200">
                    <h1 class="font-inter text-sm">Check out securely - it only takes a few minutes</h1>
                </div>
                <h1 class="font-inter font-semibold text-md">Contact Details</h1>
                <div class="grid grid-cols-2 gap-5 w-full">
                    <div class="flex flex-col gap-y-1">
                        <label>Email:</label>
                        <input type="email" class="border rounded pl-2 h-8" v-model="checkOutDetails.email">
                    </div>
                    <div class="flex flex-col gap-y-1">
                        <label>Phone Number:</label>
                        <input type="number" class="border rounded pl-2 h-8" v-model="checkOutDetails.phone">
                    </div>
                </div>
                <h1 class="font-inter font-semibold text-md">Personal Details</h1>
                <div class="grid grid-cols-2 gap-5 w-full">
                    <div class="flex flex-col gap-y-1">
                        <label>First Name:</label>
                        <input type="text" class="border rounded pl-2 h-8" v-model="checkOutDetails.firstName">
                    </div>
                    <div class="flex flex-col gap-y-1">
                        <label>Last Name:</label>
                        <input type="text" class="border rounded pl-2 h-8" v-model="checkOutDetails.lastName">
                    </div>
                    <div class="flex flex-col gap-y-1 col-span-2">
                        <label>Address:</label>
                        <textarea class="border rounded p-2 min-h-16" v-model="checkOutDetails.address"></textarea>
                    </div>
                </div>
                <h1 class="font-inter font-semibold text-md">Choose Room</h1>
                <div class="grid grid-cols-2 gap-5">
                    <div class="flex flex-col gap-y-1">
                        <label>Room Floor:</label>
                        <select class="border rounded pl-2 h-8" v-model="checkOutDetails.floor">
                            <option value="" disabled>Select Floor</option>
                            <option v-for="room in rooms" :key="room.id">{{ room.roomFloor }}</option>
                        </select>
                    </div>
                    <div v-if="checkOutDetails.floor" class="flex flex-col gap-y-1">
                        <label>Select Available Room:</label>
                        <select class="border rounded pl-2 h-8" v-model="roomDetails">
                            <option :value="{}" disabled>Select Room</option>
                            <option v-for="room in filteredRoomNumber()" :key="room.id" :value="room">{{ room.roomNumber }}</option>
                        </select>
                    </div>
                </div>
                <h1 class="font-inter font-semibold text-md">Add Ons</h1>
                <div class="flex flex-col gap-y-1">
                        <label>Beds (₱500):</label>
                        <input type="number" class="border rounded pl-2 h-8" v-model="checkOutDetails.beds" @change="addBeds">
                </div>
                <h1 class="font-inter font-semibold text-md">Payment</h1>
                <div class="grid grid-cols-2 gap-5 w-full">
                    <div class="flex flex-col gap-y-1">
                        <label>Select Mode of Payment:</label>
                        <select class="border rounded pl-2 h-8" v-model="checkOutDetails.mop" @change="showGcash = true">
                            <option value="" disabled>Select Mode of payment</option>
                            <option>GCASH</option>
                        </select>
                    </div>
                    <div class="flex flex-col gap-y-1" v-if="checkOutDetails.mop === 'GCASH'">
                        <label>Reference Number:</label>
                        <input type="text" class="border rounded pl-2 h-8" v-model="checkOutDetails.referenceNumber">
                    </div>
                </div>
                <button v-if="!checkingOut" class="bg-green-500 px-3 py-1 float-end rounded text-white">Check out</button>
                <button v-else class="bg-green-500 px-3 py-1 float-end rounded text-white animate-pulse" disabled>Checking out</button>
            </form>
            <div v-if="!loading" class="w-2/5 space-y-2">
                <img :src="room.thumbnailUrl" :alt="room.roomName" class="aspect-video rounded shadow mb-5">
                <div class="flex gap-x-1 w-full">
                    <h1 class="text-2xl capitalize  font-serif text-custom-primary font-medium">{{ checkOutDetails.roomName }}</h1>
                </div>
                <div class="space-y-3">
                    <div class="flex gap-x-1">
                        <label class="font-medium uppercase">Check In Date: </label>
                        <p>{{ formatDate(checkOutDetails.checkIn) }}</p>
                    </div>
                    <div class="flex gap-x-1">
                        <label class="font-medium uppercase">Check Out Date: </label>
                        <p>{{ formatDate(checkOutDetails.checkOut) }}</p>
                    </div>
                    <div class="flex gap-x-1">
                        <label class="font-medium uppercase">Guests: </label>
                        <p>{{ checkOutDetails.guests }}</p>
                    </div>
                    <div v-if="checkOutDetails.beds > 0" class="flex gap-x-1">
                        <label class="font-medium uppercase">Beds: </label>
                        <p>{{ checkOutDetails.beds }}</p>
                    </div>
                    <div class="flex gap-x-1">
                        <label class="font-medium uppercase">Days: </label>
                        <p>{{ checkOutDetails.days }}</p>
                    </div>
                    <div class="flex gap-x-1">
                        <label class="font-medium uppercase">Room Price: </label>
                        <p>{{ formatCurrency(checkOutDetails.roomPrice) }}/per night</p>
                    </div>
                    <hr>
                    <div class="flex gap-x-1">
                        <label class="font-medium uppercase">Total Price: </label>
                        <p>{{ formatCurrency(checkOutDetails.totalPrice) }}</p>
                    </div>
                </div>
            </div>
            <div v-else class="w-2/5">
                <div class="w-full aspect-video bg-gray-200 animate-pulse rounded"></div>
            </div>
        </div>

        <!-- gcash qr -->
        <div v-if="showGcash" class="w-screen h-screen bg-white/30 fixed top-0 left-0 backdrop-blur-sm flex items-center justify-center px-5 z-50">
            <div class="bg-white shadow border rounded-md w-full max-w-md h-fit p-4 relative">
                <!-- <button class="absolute top-4 right-4 bg-gray-200 p-2 rounded-full" @click="downloadImage">
                    <Icon icon="mdi:download" class="text-xl" />
                </button> -->
                <h1 class="text-center font-inter uppercase font-medium">Scan to pay</h1>
                <img src="../assets/Gcash QR.jpg" class="w-full aspect-square" />
                <button class="float-end bg-red-500 text-white px-4 rounded py-1" @click="showGcash = false">Close</button>
            </div>
        </div>

        <div v-if="bookingId" class="w-screen h-screen bg-black/30 z-50 fixed top-0 left-0 flex items-center justify-center px-5">
            <div class="bg-white shadow border rounded-md w-full max-w-md h-fit p-4 relative flex flex-col items-center gap-y-5">
                <Icon icon="ix:success-filled" class="text-7xl text-green-500" />
                <h1 class="text-2xl uppercase">Booking Confirmed</h1>
                <p class="w-11/12 text-center text-xl">Your reservation is confirmed. Thank you for choosing us!</p>
                <p class="font-medium text-lg"><span class="uppercase">Booking Id:</span> <span class="text-neutral-500">{{ bookingId }}</span></p>
                <router-link :to="{ name: 'rooms' }" class="bg-green-500 w-1/3 py-1 rounded mt-2 text-white text-center">OK</router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { db } from '../config/firebaseConfig'
import { addDoc, doc, getDoc, getDocs, collection, query, where, limit, updateDoc } from 'firebase/firestore'
import { useAuthStore } from '../store'
import moment from 'moment'

const authStore = useAuthStore()
const currentUser = computed(() => authStore.user)

const route = useRoute()

const showGcash = ref(false)

watch(currentUser, () => {
    getUserDetails()
})

onMounted(() => {
    getUserDetails()
    getRoomDetails()
})

onUnmounted(() => {
    bookingId.value  = ''
})

const userDetails = ref({})

const getUserDetails = async () => {
    try {
        const q = query(
            collection(db, 'users'),
            where('userId', '==', currentUser.value?.uid),
            limit(1)
        )
        const snapshot = await getDocs(q)

        userDetails.value = {
            id: snapshot.docs[0].id,
            ...snapshot.docs[0].data()
        }

        checkOutDetails.value.email = userDetails.value?.email || currentUser.value?.email
        checkOutDetails.value.phone = userDetails.value?.phoneNumber || ''
        checkOutDetails.value.firstName = userDetails.value?.firstName || currentUser.value?.displayName.split(' ')[0]
        checkOutDetails.value.lastName = userDetails.value?.lastName || currentUser.value?.displayName.split(' ')[1]
        checkOutDetails.value.address = userDetails.value?.address || ''
    } catch (error) {
        console.log(error)
    }
}

const checkOutDetails = ref({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    floor: '',
    beds: 0,
    mop: '',
    referenceNumber: '',
    roomName: '',
    checkIn: route.query.checkIn || '',
    checkOut: route.query.checkOut || '',
    guests: route.query.guests || '',
    days: 0,
    roomPrice: 0,
    totalPrice: 0,
})

const roomDetails = ref({})

const addBeds = () => {
    checkOutDetails.value.totalPrice += checkOutDetails.value.beds * 500
}

const calculateDays = () => {
    const oneDay = 24 * 60 * 60 * 1000
    
    const checkInDate = new Date(checkOutDetails.value.checkIn)
    const checkOutDate = new Date(checkOutDetails.value.checkOut)

    if (isNaN(checkInDate) || isNaN(checkOutDate)) return 0

    let diffDays = Math.round((checkOutDate - checkInDate) / oneDay)

    if (diffDays === 0) {
        diffDays = 1
    }

    checkOutDetails.value.days = diffDays

    return diffDays
}


calculateDays()

const formatCurrency = (price) => {
    return `₱ ${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'PHP', currencyDisplay: 'code' }).format(Number(price)).replace('PHP', '')}`
}

const formatDate = (date) => {

    const newDate  = new Date(date)

    return moment(newDate).format('LL')
}


// check out
const err = ref(false)
const failedCheckingOut = ref(false)
const checkingOut = ref(false)
const bookingId = ref('')

const checkOut = async () => {
    failedCheckingOut.value = false
    err.value = false
    if (Object.values(checkOutDetails.value).some(field => field === undefined || field === null || field === "")) {
        err.value = true;
    }


    try {
        checkingOut.value = true
        const snapshot = await addDoc(collection(db, 'booking'), {
            ...checkOutDetails.value,
            number: roomDetails.value.roomNumber,
            roomNumberId: roomDetails.value.id,
            status: 'pending',
            userId: currentUser.value.uid,
            bookedAt: new Date()
        })


        await updateDoc(doc(db, 'roomNumbers', roomDetails.value.id), {
            roomStatus: 'Unavailable'
        })

        if(snapshot.empty) return failedCheckingOut.value = true

        bookingId.value = snapshot.id

        addDoc(collection(db, 'notifications'), {
            notif: `New Booking: A new booking has been made with Booking ID ${bookingId.value}.`,
            isRead: false,
            isView: false,
            notifiedAt: new Date()
        })

        checkOutDetails.value = {
            email: '',
            phone: '',
            firstName: '',
            lastName: '',
            address: '',
            floor: '',
            beds: 0,
            mop: '',
            referenceNumber: '',
            roomName: '',
            checkIn: route.query.checkIn || '',
            checkOut: route.query.checkOut || '',
            guests: route.query.guests || '',
            days: 0,
            roomPrice: 0,
            totalPrice: 0
        }

        roomDetails.value = {}
    } catch (error) {
        console.log(error)   
    } finally {
        checkingOut.value = false
    }
}

const downloadImage = () => {
  const link = document.createElement('a')
  link.href = '@assets/Gcash QR.jpg'
  link.download = 'Gcash QR.jpg'
  link.click()
}

// getroom details
const room = ref({})
const loading = ref(false)

const getRoomDetails = async () => {
    try {
        loading.value = true
        const snapshot = await getDoc(doc(db, 'rooms', route.query?.id))

        if(snapshot.empty) return alert('invalid room id')

        room.value = {
            id: snapshot.id,
            ...snapshot.data()
        }

        getRooms()

        checkOutDetails.value.roomName = snapshot.data().roomName
        checkOutDetails.value.roomPrice = snapshot.data().roomPrice
        checkOutDetails.value.totalPrice = snapshot.data().roomPrice * checkOutDetails.value.days || 0
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const rooms = ref([])

const getRooms = async () => {
    try {
         const q = query(
            collection(db, 'roomNumbers'),
            where('roomType', '==', route.query?.id),
        )

        const snapshots = await getDocs(q)

        snapshots.docs.forEach(doc => {
            rooms.value.push({
                id: doc.id,
                ...doc.data()
            })
        })
    } catch (error) {
        console.log(error)
    }
}

const filteredRoomNumber = () => {
    return rooms.value.filter(room => room.roomFloor === checkOutDetails.value?.floor && room.roomStatus === 'Available')
}
</script>