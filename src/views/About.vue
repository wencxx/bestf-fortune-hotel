<template>
  <div
    class="min-h-[90dvh] bg-gray-100 "
  >
    <div class="h-[90dvh] px-10 flex flex-col items-center justify-center gap-y-20">
        <div class="flex items-center gap-x-10 text-2xl">
          <Icon icon="iconoir:infinite" class="text-amber-500 text-3xl" />
          <p class="font-serif">About Us</p>
          <Icon icon="iconoir:infinite" class="text-amber-500 text-3xl" />
        </div>
        <p class="text-center w-2/3 text-xl font-light font-inter">
          Welcome to the Best Fortune Hotel, a 2-star accommodation conveniently
          located in the heart of Manila, Philippines. Offering excellent amenities
          and a comfortable stay, it's perfect for both business and leisure
          travelers. Built in 1997, the hotel boasts 90 well-appointed rooms and
          top-notch service. Located just 0.7 km from the city center and 45 minutes
          from the airport, it provides easy access to Manila's attractions.
          Check-in starts at 2 PM, and check-out is until 12 PM. The hotel is
          family-friendly, offering free stays for children aged 0 to 6. Book your
          stay today and experience the best of Manila.
        </p>
    </div>
    <div class="mb-10 space-y-10">
        <p class="font-serif text-2xl text-center">Hotel Images</p>
        <div class="grid grid-cols-3 w-3/4 mx-auto gap-5">
            <img src="../assets/bfh1.jpg" class="w-full aspect-square rounded" alt="bfh1">
            <img src="../assets/bfh2.jpg" class="w-full aspect-square rounded" alt="bfh2">
            <img src="../assets/bfh3.jpg" class="w-full aspect-square rounded" alt="bfh3">
            <img src="../assets/bfh4.jpg" class="w-full aspect-square rounded" alt="bfh4">
            <img src="../assets/bfh5.jpg" class="w-full aspect-square rounded" alt="bfh5">
            <img src="../assets/about3.jpg" class="w-full aspect-square rounded" alt="about3">
        </div>  
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.router-link-active {
  background-color: transparent;
}
</style>
