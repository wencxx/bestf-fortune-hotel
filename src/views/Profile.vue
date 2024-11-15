<template>
    <div class="min-h-[90dvh] bg-gray-100 px-10 flex justify-center">
        <div class="w-full max-w-6xl flex !h-[90dvh] bg-white font-inter">
            <div class="w-1/5 border-r h-full">
                <nav>
                    <ul class="p-5 font-inter space-y-2">
                        <li>
                            <router-link :to="{ name: 'profileInfo' }" class="flex items-center gap-x-2">
                                <Icon icon="mdi:user" class="text-3xl" />
                                <span class="text-xl">Profile</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'bookings' }" class="flex items-center gap-x-2">
                                <Icon icon="lsicon:receipt-outline" class="text-3xl" />
                                <span class="text-xl">Bookings</span>
                            </router-link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="w-4/5">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script setup>
   
</script>

<style scoped>
.router-link-active {
    background-color: transparent;
}

</style>