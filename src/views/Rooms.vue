<template>
    <div class="h-[90dvh] bg-gray-100 py-10">
        <div class="flex flex-col items-center gap-y-20">
            <div class="border-b border-black w-fit mx-auto">
                <h1 class="text-3xl font-serif">Our Room</h1>
            </div>
            <!-- rooms -->
            <div class="w-full max-w-6xl border grid grid-cols-3">
                <div class="flex flex-col gap-y-10 border col-span-2">
                    <div class="flex gap-5 h-fit">
                        <!-- img -->
                        <div class="w-1/2 aspect-video rounded bg-gray-500 animate-pulse">

                        </div>
                        <!-- data -->
                        <div class="flex flex-col gap-y-2 py-2">
                            <h1 class="font-inter font-semibold tracking-wide text-2xl">Deluxe Room</h1>
                            <h2 class="font-semibold"><span class="text-custom-primary text-xl">₱1,623</span> <span class="text-sm text-gray-500">/ night</span></h2>
                            <div class="w-full grid grid-cols-2 gap-y-2">
                                <p class="text-sm w-3/4 font-inter text-gray-500 font-semibold tracking-wide">Bed:<br><span class="text-black font-medium text-sm">1 Double Bed and 1 Single Bed</span></p>
                                <p class="text-sm w-3/4 font-inter text-gray-500 font-semibold tracking-wide">Size:<br><span class="text-black font-medium text-sm">14 m²/151 ft²</span></p>
                                <p class="text-sm w-3/4 font-inter text-gray-500 font-semibold tracking-wide">Capacity:<br><span class="text-black font-medium text-sm">4 persons</span></p>
                                <p class="text-sm w-3/4 font-inter text-gray-500 font-semibold tracking-wide">Bathroom::<br><span class="text-black font-medium text-sm">Shower</span></p>
                            </div>
                            <p class="text-sm">Spacious and ideal for small families or groups, offering a blend of comfort and value.</p>
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>