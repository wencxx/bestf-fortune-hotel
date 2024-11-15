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
        children: [
            {
                path: '',
                name: 'profileInfo',
                component: () => import('../views/ProfileInfo.vue')
            },
            {
                path: '/bookings',
                name: 'bookings',
                component: () => import('../views/Bookings.vue')
            }
        ]
    },
    {
        path: '/rooms',
        name: 'rooms',
        component: () => import('../views/Rooms.vue')
    },
    {
        path: '/check-out',
        name: 'checkOut',
        component: () => import('../views/CheckOut.vue')
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router