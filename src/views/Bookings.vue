<template>
    <div class="min-h-[100dvh] pt-[10dvh] bg-gray-200 px-4 flex justify-center fixed top-0 w-full">
        <div class="w-full max-w-5xl flex flex-col gap-y-6 font-inter py-10">
            <div v-if="cancelledBooking" class="w-full py-2 bg-red-500 rounded pl-4 text-white uppercase shadow">
                <p>Booking with booking ID: <span class="font-bold underline">{{ cancelledBooking }}</span> cancelled successfully!</p>
            </div>
            <div class="flex items-center justify-between mb-2">
                <h1 class="font-semibold text-2xl flex items-center gap-x-2">
                    <Icon icon="majesticons:book-line" class="text-3xl" /> My Bookings
                </h1>
                <span class="text-gray-500 text-sm">{{ bookings.length }} booking(s)</span>
            </div>
            <div v-if="loading" class="flex flex-col gap-4">
                <div v-for="i in 3" :key="i" class="bg-white rounded-xl shadow p-6 animate-pulse flex flex-col gap-2">
                    <div class="h-5 w-1/3 bg-gray-200 rounded"></div>
                    <div class="h-4 w-1/2 bg-gray-200 rounded"></div>
                    <div class="h-4 w-1/4 bg-gray-200 rounded"></div>
                </div>
            </div>
            <div v-else-if="!loading && bookings.length" class="flex flex-col gap-6">
                <div v-for="(booking, index) in bookings" :key="booking.id" class="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-gray-100">
                    <div class="flex-1 flex flex-col gap-2">
                        <div class="flex items-center gap-2">
                            <span class="font-bold text-lg text-custom-primary">{{ booking.roomName }}</span>
                            <span class="ml-2 px-2 py-0.5 rounded text-xs font-semibold"
                                :class="{
                                    'bg-orange-100 text-orange-700': booking.status === 'pending',
                                    'bg-red-100 text-red-700': booking.status === 'canceled',
                                    'bg-blue-100 text-blue-700': booking.status === 'accepted',
                                    'bg-yellow-100 text-yellow-700': booking.status === 'paid',
                                    'bg-green-100 text-green-700': booking.status === 'confirmed',
                                    'bg-red-100 text-red-700': booking.status === 'declined',
                                }">
                                {{ booking.status }}
                            </span>
                        </div>
                        <div class="text-gray-500 text-sm">Booking ID: <span class="font-mono">{{ booking.id }}</span></div>
                        <div class="flex flex-wrap gap-4 mt-2">
                            <div class="flex flex-col">
                                <span class="text-xs text-gray-400">Booked At</span>
                                <span class="font-medium">{{ formatFirebaseTimestamp(booking.bookedAt) }}</span>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-xs text-gray-400">Check In</span>
                                <span class="font-medium">{{ formatDate(booking.checkIn) }}</span>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-xs text-gray-400">Check Out</span>
                                <span class="font-medium">{{ formatDate(booking.checkOut) }}</span>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-xs text-gray-400">Days</span>
                                <span class="font-medium">{{ booking.days }}</span>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-xs text-gray-400">Total Price</span>
                                <span class="font-medium text-custom-primary">{{ formatCurrency(booking.totalPrice) }}</span>
                            </div>
                        </div>
                        <div class="mt-2 text-xs text-gray-500">
                            <span class="font-semibold">Reason:</span> {{ booking.reasonForDeclining || 'N/A' }}
                        </div>
                    </div>
                    <div class="flex flex-col items-end gap-2 min-w-[120px]">
                        <button v-if="booking.status !== 'canceled'" 
                            :disabled="cancelling"
                            class="bg-red-500 hover:bg-red-600 transition text-white rounded px-4 py-2 text-sm font-semibold shadow disabled:opacity-60 disabled:cursor-not-allowed"
                            @click="cancelBooking(booking.id, index)">
                            <span v-if="!cancelling">Cancel Booking</span>
                            <span v-else>Cancelling...</span>
                        </button>
                        <span v-else class="text-red-400 text-xs font-semibold">Booking Cancelled</span>
                    </div>
                </div>
            </div>
            <div v-else-if="!loading && bookings.length === 0" class="flex flex-col items-center justify-center py-20">
                <Icon icon="majesticons:book-line" class="text-5xl text-gray-300 mb-2" />
                <span class="text-gray-400 text-lg">No bookings to show</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { db } from '../config/firebaseConfig'
import { collection, getDocs, query, where, doc, updateDoc, addDoc } from 'firebase/firestore'
import { computed, onMounted, ref, watch } from 'vue'
import { useAuthStore } from '../store'
import moment from 'moment'

const authStore = useAuthStore()
const currentUser = computed(() => authStore.user)

onMounted(() => {
    watch(currentUser, () => {
            getBookings()
    })
    if(currentUser.value?.uid){
        getBookings()
    }
})

// get bookings
const loading = ref(false)
const bookings = ref([])
const bookingsReference = collection(db, 'booking')

const getBookings = async () => {
    try {
        loading.value = true
        const q = query(
            bookingsReference,
            where('userId', '==', currentUser.value?.uid)
        )

        const snapshots = await getDocs(q)

        snapshots.docs.forEach(doc => {
            bookings.value.push({
                id: doc.id,
                ...doc.data()
            })
        })

        console.log('success')
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const formatCurrency = (price) => {
    return `₱ ${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'PHP', currencyDisplay: 'code' }).format(Number(price)).replace('PHP', '')}`;
};

const formatDate = (date) => {
    return moment(new Date(date)).format('ll')
}

function formatFirebaseTimestamp(firebaseTimestamp) {
    const { seconds, nanoseconds } = firebaseTimestamp;
    const milliseconds = seconds * 1000 + nanoseconds / 1e6;
    return moment(milliseconds).format('lll');
}

// cancel booking
const cancelledBooking = ref('')
const cancelling = ref(false)
const notifRef = collection(db, 'notifications')
const cancelBooking = async (bookingId, index) => {
    try {
        cancelling.value = true
        
        await updateDoc(doc(db, 'booking', bookingId), {
            status: 'canceled'
        })

        cancelledBooking.value = bookingId

        await addDoc(notifRef, {
            notif: `Booking Canceled: ${currentUser.value.displayName} canceled a booking.`,
            isRead: false,
            isView: false,
            notifiedAt: new Date()
        })

        setTimeout(() => {
            cancelledBooking.value = ''
        }, 3000)

        bookings.value[index].status = 'canceled'
    } catch (error) {
        console.log(error)
    } finally {
        cancelling.value = false
    }
}
</script>

<style scoped>
.text-custom-primary {
    color: #2563eb;
}
.bg-custom-primary {
    background: #2563eb;
}
.font-inter {
    font-family: 'Inter', sans-serif;
}
</style>