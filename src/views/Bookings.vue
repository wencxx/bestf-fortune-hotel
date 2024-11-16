<template>
    <div class="min-h-[90dvh] bg-gray-100 px-10 flex justify-center">
        <div class="w-full max-w-6xl flex flex-col gap-y-5 !h-[90dvh] font-inter py-14">
            <div v-if="cancelledBooking" class="w-full py-2 bg-red-500 rounded pl-4 text-white uppercase">
                <p>Booking with booking ID: <span class="font-bold underline">{{ cancelledBooking }}</span> cancelled successfully!</p>
            </div>
            <h1 class="font-medium text-xl flex items-center gap-x-2"><Icon icon="majesticons:book-line" class="text-3xl" /> Bookings</h1>
            <div class="w-full max-w-6xl bg-white p-5 rounded-xl overflow-x-auto">
                <table class="w-full min-w-[600px]">
                    <thead>
                        <tr>
                            <th class="border w-2/12 border-black py-1">Booking Id</th>
                            <th class="border w-2/12 border-black py-1">Room</th>
                            <th class="border w-2/12 border-black py-1">Check In</th>
                            <th class="border w-2/12 border-black py-1">Check Out</th>
                            <th class="border w-1/12 border-black py-1">Days</th>
                            <th class="border w-1/12 border-black py-1">Total Price</th>
                            <th class="border w-1/12 border-black py-1">Status</th>
                            <th class="border w-1/12 border-black py-1">Action</th>
                        </tr>
                    </thead>
                    <tbody v-if="loading">
                        <tr v-for="i in 5" :key="i">
                            <td class="border border-black text-center py-1">
                                <div class="h-5 mx-auto w-3/4 bg-gray-300 animate-pulse rounded"></div>
                            </td>
                            <td class="border border-black text-center py-1">
                                <div class="h-5 mx-auto w-3/4 bg-gray-300 animate-pulse rounded"></div>
                            </td>
                            <td class="border border-black text-center py-1">
                                <div class="h-5 mx-auto w-3/4 bg-gray-300 animate-pulse rounded"></div>
                            </td>
                            <td class="border border-black text-center py-1">
                                <div class="h-5 mx-auto w-3/4 bg-gray-300 animate-pulse rounded"></div>
                            </td>
                            <td class="border border-black text-center py-1">
                                <div class="h-5 mx-auto w-3/4 bg-gray-300 animate-pulse rounded"></div>
                            </td>
                            <td class="border border-black text-center py-1">
                                <div class="h-5 mx-auto w-3/4 bg-gray-300 animate-pulse rounded"></div>
                            </td>
                            <td class="border border-black text-center py-1">
                                <div class="h-5 mx-auto w-3/4 bg-gray-300 animate-pulse rounded"></div>
                            </td>
                            <td class="border border-black text-center py-1">
                                <div class="h-5 mx-auto w-3/4 bg-gray-300 animate-pulse rounded"></div>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else-if="!loading && bookings.length">
                        <tr v-for="(booking, index) in bookings" :key="booking.id">
                            <td class="border border-black text-center py-1">{{ booking.id }}</td>
                            <td class="border border-black text-center py-1">{{ booking.roomName }}</td>
                            <td class="border border-black text-center py-1">{{ formatDate(booking.checkIn) }}</td>
                            <td class="border border-black text-center py-1">{{ formatDate(booking.checkOut) }}</td>
                            <td class="border border-black text-center py-1">{{ booking.days }} day(s)</td>
                            <td class="border border-black text-center py-1">{{ formatCurrency(booking.totalPrice) }}</td>
                            <td class="border border-black text-center py-1">
                                <div class="text-white rounded w-4/5 mx-auto capitalize text-sm px-1 h-3/4" :class="{ 'bg-orange-500': booking.status === 'pending', 'bg-red-500': booking.status === 'canceled', 'bg-green-500': booking.status === 'accepted' }">
                                    {{ booking.status }}
                                </div>
                            </td>
                            <td class="border border-black text-center py-1">
                                <div v-if="booking.status !== 'canceled'">
                                    <button v-if="!cancelling" class="bg-red-500 px-3 text-white rounded text-sm h-3/4" @click="cancelBooking(booking.id, index)">Cancel</button>
                                    <button v-else class="bg-red-500 px-3 text-white rounded text-sm h-3/4" disabled>Cancelling</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else-if="!loading && bookings.length === 0">
                        <tr>
                            <td colspan="8" class="border border-black text-center py-1">No bookings to show</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { db } from '../config/firebaseConfig'
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore'
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

// cancel booking
const cancelledBooking = ref('')
const cancelling = ref(false)
const cancelBooking = async (bookingId, index) => {
    try {
        cancelling.value = true
        
        await updateDoc(doc(db, 'booking', bookingId), {
            status: 'canceled'
        })

        cancelledBooking.value = bookingId

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