import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue')
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