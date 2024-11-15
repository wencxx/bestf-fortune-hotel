import { defineStore } from 'pinia'

const useAuthStore = defineStore('authStore', {
    state: () => ({
        user: null,
        isAuth: !!localStorage.getItem('isAuth'),
        token: localStorage.getItem('token') || null
    }),
    actions: {
        async login(token, user){
            try {
                this.token = token
                this.user = user
                this.isAuth = true

                localStorage.setItem('token', token)
                localStorage.setItem('isAuth', true)
            } catch (error) {
                console.log(error)
            }
        },
        async signout(){
            try {
                this.token = null,
                this.user = null
                this.isAuth = false
    
                localStorage.removeItem('token')
                localStorage.removeItem('isAuth')
            } catch (error) {
                console.log(error)
            }
        }
    }
})

export default useAuthStore