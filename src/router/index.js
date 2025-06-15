import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/Profile.vue'),
    },
    {
        path: '/bookings',
        name: 'bookings',
        component: () => import('../views/Bookings.vue')
    },
    {
        path: '/rooms',
        name: 'rooms',
        component: () => import('../views/Rooms.vue')
    },
    {
        path: '/room-details/:id',
        name: 'roomDetails',
        component: () => import('../views/RoomDetails.vue')
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/About.vue')
    },
    {
        path: '/check-out',
        name: 'checkOut',
        component: () => import('../views/CheckOut.vue')
    },
    {
        path: '/payment/:id',
        name: 'payment',
        component: () => import('../views/payment.vue')
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router