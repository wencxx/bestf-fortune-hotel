<template>
    <div class="min-h-[100dvh] bg-gray-200 py-10 !pb-20 px-2 sm:px-6 md:px-10 flex items-center justify-center pt-[15dvh]">
        <div class="w-full max-w-6xl flex flex-col lg:flex-row my-auto rounded-xl p-2 sm:p-5 bg-white h-fit gap-5 lg:gap-10 font-inter">
            <form @submit.prevent="checkOut" class="w-full lg:w-3/5 space-y-3">
                <div v-if="err" class="w-full h-fit py-2 bg-custom-primary/45 rounded-md flex items-center pl-5 border border-red-200">
                    <h1 class="font-inter text-sm">{{ err }}</h1>
                </div>
                <div v-if="failedCheckingOut" class="w-full h-fit py-2 bg-custom-primary/45 rounded-md flex items-center pl-5 border border-red-200">
                    <h1 class="font-inter text-sm">Failed checking out. Try again later</h1>
                </div>
                <h1 class="font-inter text-xl font-semibold">Secure Checkout</h1>
                <div class="w-full h-fit py-3 bg-custom-secondary/15 rounded-md flex items-center pl-5 border border-yellow-200">
                    <h1 class="font-inter text-sm">Check out securely - it only takes a few minutes</h1>
                </div>
                <div class="w-full h-fit py-2 bg-red-100 rounded-md flex items-center pl-5 border border-red-300">
                    <h1 class="font-inter text-sm font-semibold text-red-600">Reminder: This payment is <span class="uppercase">not refundable</span>.</h1>
                </div>
                <h1 class="font-inter font-semibold text-md">Contact Details</h1>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                    <div class="flex flex-col gap-y-1">
                        <label>Email:</label>
                        <input type="email" class="border rounded pl-2 h-8" v-model="checkOutDetails.email">
                    </div>
                    <div class="flex flex-col gap-y-1">
                        <label>Phone Number:</label>
                        <input
                            type="number"
                            class="border rounded pl-2 h-8"
                            v-model="checkOutDetails.phone"
                            :max="99999999999"
                            @input="limitPhoneLength"
                        >
                    </div>
                </div>
                <h1 class="font-inter font-semibold text-md">Personal Details</h1>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
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
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div class="flex flex-col gap-y-1">
                        <label>Room Floor:</label>
                        <select class="border rounded pl-2 h-8" v-model="checkOutDetails.floor">
                            <option value="" disabled>Select Floor</option>
                            <option v-for="floor in filteredFloors()" :key="floor">{{ floor }}</option>
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
                        <input type="number" class="border rounded pl-2 h-8" min="0" v-model="checkOutDetails.beds" @change="addBeds">
                </div>
                <button v-if="!checkingOut" class="bg-green-500 px-3 py-1 float-end rounded text-white">Check out</button>
                <button v-else class="bg-green-500 px-3 py-1 float-end rounded text-white animate-pulse" disabled>Checking out</button>
            </form>
            <div v-if="!loading" class="w-full lg:w-2/5 space-y-2">
                <img :src="room.thumbnailUrl" :alt="room.roomName" class="aspect-video rounded shadow mb-5 w-full object-cover">
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
                    <div v-if="checkOutDetails.roomPromo" class="flex gap-x-1">
                        <label class="font-medium uppercase">Room Promo: </label>
                        <p>-{{ checkOutDetails.roomPromo }}%</p>
                    </div>
                    <hr>
                    <div class="flex gap-x-1 bg-custom-primary text-white py-1 pl-2 rounded">
                        <label class="font-medium uppercase">Total Price: </label>
                        <p>{{ formatCurrency(checkOutDetails.totalPrice) }}</p>
                    </div>
                </div>
            </div>
            <div v-else class="w-full lg:w-2/5">
                <div class="w-full aspect-video bg-gray-200 animate-pulse rounded"></div>
            </div>
        </div>

        <div v-if="bookingId" class="w-screen h-screen bg-black/30 z-50 fixed top-0 left-0 flex items-center justify-center px-2 sm:px-5">
            <div class="bg-white shadow border rounded-md w-full max-w-md h-fit p-4 relative flex flex-col items-center gap-y-5">
                <Icon icon="ix:success-filled" class="text-7xl text-green-500" />
                <h1 class="text-2xl uppercase">Booking Confirmed</h1>
                <p class="w-11/12 text-center text-xl">Your reservation is confirmed. Thank you for choosing us!</p>
                <p class="w-11/12 text-center text-base text-gray-700">
                    Once your booking is accepted, you will receive an email containing a link to process your payment.
                </p>
                <p class="font-medium text-lg"><span class="uppercase">Booking Id:</span> <span class="text-neutral-500">{{ bookingId }}</span></p>
                <router-link :to="{ name: 'rooms' }" class="bg-green-500 w-1/3 py-1 rounded mt-2 text-white text-center">OK</router-link>
            </div>
        </div>

        <!-- Checkout Confirmation Modal -->
        <div v-if="showCheckoutConfirm" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div class="bg-white rounded-lg shadow-lg p-4 sm:p-6 max-w-md w-full relative">
                <h2 class="text-xl font-bold mb-2 text-center">Confirm Checkout</h2>
                <p class="mb-4 text-center text-red-600 font-semibold">
                    Are you sure you want to proceed with the checkout?<br>
                    This payment is <span class="uppercase">not refundable</span>.
                </p>
                <div class="flex justify-center gap-4 mt-4">
                    <button @click="confirmCheckout" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Yes, Proceed</button>
                    <button @click="cancelCheckout" class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
                </div>
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

const showCheckoutConfirm = ref(false)

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
    roomName: '',
    checkIn: route.query.checkIn || '',
    checkOut: route.query.checkOut || '',
    guests: route.query.guests || '',
    days: 0,
    roomPrice: 0,
    roomPromo: 0,
    totalPrice: 0,
})

const roomDetails = ref({})

const limitPhoneLength = () => {
    // Only allow up to 11 digits
    if (checkOutDetails.value.phone) {
        checkOutDetails.value.phone = checkOutDetails.value.phone.toString().slice(0, 11)
    }
}

const addBeds = () => {
    // Prevent negative values
    if (checkOutDetails.value.beds < 0) {
        checkOutDetails.value.beds = 0
    }
    // Recalculate total price based on beds
    const discount = (checkOutDetails.value.roomPrice * checkOutDetails.value.roomPromo) / 100;
    const finalPrice = checkOutDetails.value.roomPrice - discount;
    checkOutDetails.value.totalPrice = (finalPrice * checkOutDetails.value.days) + (checkOutDetails.value.beds * 500);
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
    if (
        Object.values(checkOutDetails.value).some(field => field === undefined || field === null || field === "")
    ) {
        err.value = 'Fill out all required fields';
        return;
    }
    showCheckoutConfirm.value = true
}

const confirmCheckout = async () => {
    showCheckoutConfirm.value = false
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

const cancelCheckout = () => {
    showCheckoutConfirm.value = false
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
        checkOutDetails.value.roomPrice = snapshot.data().roomPrice;
        checkOutDetails.value.roomPromo = snapshot.data().roomPromo || 0;

        const discount = (checkOutDetails.value.roomPrice * checkOutDetails.value.roomPromo) / 100;
        const finalPrice = checkOutDetails.value.roomPrice - discount;

        checkOutDetails.value.totalPrice = (finalPrice * checkOutDetails.value.days) + (checkOutDetails.value.beds * 500) || 0;
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
            const roomData = doc.data()
     
            rooms.value.push({
                id: doc.id,
                ...roomData
            })
        })

        } catch (error) {
        console.log(error)
    }
}

const filteredRoomNumber = () => {
    return rooms.value.filter(room => room.roomFloor === checkOutDetails.value?.floor && room.roomStatus === 'Available')
}


const filteredFloors = () => {
    let floors = []
    
    for (const room of rooms.value) {
        if (!floors.includes(room.roomFloor)) {
            floors.push(room.roomFloor)
        }
    }

    return floors
}
</script>