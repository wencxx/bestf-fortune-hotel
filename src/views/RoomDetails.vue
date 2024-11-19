<template>
    <div class="bg-gray-100">
        <div class="w-full max-w-6xl mx-auto min-h-[90dvh] space-y-5">
            <div class="relative">
                <img src="../assets/Semi-Double 1.jpg" alt="" class="aspect-video">
                <div class="absolute top-0 left-0 bg-black/10 w-full h-full"></div>
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[90%] border border-white flex items-end p-5">
                    <h1 class="text-4xl font-serif text-white">Room Name</h1>
                </div>
                <div class="hidden lg:flex items-center justify-center bg-white w-fit h-fit p-3 absolute left-1/2 translate-x-1/2 top-1/2 translate-y-1/2 mt-10 shadow rounded-md">
                    <div class="w-fit h-fit p-5 border flex flex-col gap-y-5 items-center border-custom-primary rounded">
                        <h1 class="font-serif text-lg">Book This Room</h1>
                        <div class="flex gap-x-5">
                            <div class="flex flex-col items-center">
                                <Icon icon="majesticons:phone-retro-line" class="text-2xl text-custom-primary" />
                                <p>+9638806212</p>
                            </div>
                            <div class="flex flex-col items-center">
                                <Icon icon="ic:outline-email" class="text-2xl text-custom-primary" />
                                <p>bfh@gmail.com</p>
                            </div>
                        </div>
                        <div class="flex flex-col gap-y-2 items-center">
                            <p class="text-center">Follow Us & share your experience.</p>
                            <div class="flex items-center gap-x-2">
                                <a href="https://www.facebook.com/BestFortuneHotel" target="_blank"><Icon icon="ant-design:facebook-filled" class="text-2xl text-blue-500" /></a>
                                <Icon icon="skill-icons:instagram" class="text-xl mt-0.5" />
                            </div>
                        </div>
                        <button class="bg-custom-primary text-white w-3/4 py-1 rounded">Book Now</button>
                    </div>
                </div>
            </div>
            <div class="w-full p-5 text-center lg:text-justify lg:w-1/2 font-inter text-gray-500 text-sm tracking-wide">
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>