<template>
  <div class="content">
    <div
      class="h-[90dvh] flex flex-col items-center gap-y-32 justify-center w-full font-inter"
    >
      <div class="text-center space-y-3">
        <h1 class="text-white font-semibold font-serif text-5xl">
          Welcome to the Best Fortune Hotel
        </h1>
        <p class="text-white font-2xl capitalize">
          a 2-star accommodation conveniently located in the heart of Manila,
          Philippines.
        </p>
      </div>
      <div
        class="flex w-11/12 bg-white lg:w-2/5 h-20 rounded font-light shadow overflow-hidden"
      >
        <div
          class="w-1/4 flex flex-col items-center justify-center cursor-pointer"
        >
          <span>Check in</span>
          <input
            type="date"
            :min="minDate"
            id="checkin"
            class="text-xs cursor-pointer focus:outline-none"
            v-model="checkInDate"
          />
        </div>
        <div
          class="w-1/4 flex flex-col items-center justify-center cursor-pointer"
        >
          <span>Check out</span>
          <input
            type="date"
            :min="minDate"
            id="checkin"
            class="text-xs cursor-pointer focus:outline-none"
            v-model="checkOutDate"
          />
        </div>
        <div
          class="w-1/4 flex flex-col items-center justify-center cursor-pointer"
        >
          guests
          <select
            class="border w-3/5 rounded pl-2 focus:outline-none"
            v-model="guests"
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
          </select>
        </div>
        <button
          class="w-1/4 px-10 flex items-center justify-center bg-custom-primary text-white font-inter"
          @click="checkAvailability"
        >
          Check Availability
        </button>
      </div>
    </div>
    <!-- ameneties -->
    <div
      class="h-fit w-full flex flex-col items-center gap-y-14 p-10 bg-gray-100"
    >
      <h1
        class="font-serif text-2xl font-medium border-b-2 border-custom-primary"
      >
        Our Amenities
      </h1>
      <div class="grid md:grid-cols-2 lg:grid-cols-4 w-full max-w-6xl">
        <div class="w-full h-48 flex flex-col items-center p-5 space-y-4">
          <Icon
            icon="material-symbols:emoji-transportation-outline-rounded"
            class="text-4xl text-custom-primary"
          />
          <h1 class="text-xl">Transportation</h1>
          <p class="text-center text-gray-500">
            650 meters to public transportation
          </p>
        </div>
        <div class="w-full h-48 flex flex-col items-center p-5 space-y-4">
          <Icon
            icon="material-symbols:wifi"
            class="text-4xl text-custom-primary"
          />
          <h1 class="text-xl">Internet Connection</h1>
          <p class="text-center text-gray-500">Free Wi-Fi in all rooms</p>
        </div>
        <div class="w-full h-48 flex flex-col items-center p-5 space-y-4">
          <Icon
            icon="mdi:vacuum-cleaner"
            class="text-4xl text-custom-primary"
          />
          <h1 class="text-xl">Maintenance</h1>
          <p class="text-center text-gray-500">Daily Housekeeping</p>
        </div>
        <div class="w-full h-48 flex flex-col items-center p-5 space-y-4">
          <Icon
            icon="mingcute:air-condition-open-fill"
            class="text-4xl text-custom-primary"
          />
          <h1 class="text-xl">Air Conditioning</h1>
          <p class="text-center text-gray-500">Fully air-conditioned rooms</p>
        </div>
      </div>
    </div>
    <!-- promos -->
    <div
      v-if="promos.length"
      class="h-fit w-full flex flex-col items-center gap-y-14 p-10"
    >
      <h1
        class="font-serif text-2xl font-medium border-b-2 border-custom-primary"
      >
        Our Promos
      </h1>
      <div
        v-for="promo in promos"
        :key="promo.id"
        class="grid w-full max-w-6xl gap-3"
        :class="{
          'md:grid-cols-2 lg:grid-cols-4': promo.imagesUrls.length > 4,
          'md:grid-cols-2 lg:grid-cols-3': promo.imagesUrls.length === 3,
          'lg:grid-cols-2': promo.imagesUrls.length === 2,
        }"
      >
        <p class="col-span-full text-center mb-5 font-serif text-xl">
          {{
            promo.description ||
            "Unwind in the heart of Manila with our exclusive promo designed for those who seek comfort, elegance, and exceptional hospitality."
          }}
        </p>
        <img
          v-for="img in promo.imagesUrls"
          :key="img"
          :src="img"
          alt="promo images"
          class="rounded w-full aspect-auto"
        />
      </div>
    </div>
    <!-- about us -->
    <!-- <div class="h-fit bg-gray-100">
            <div class="items-stretch w-full max-w-6xl mx-auto flex gap-y-14 p-10">
                <div class="w-1/2 flex flex-col items-center space-y-4">
                    <h3 class="font-medium text-sm font-inter uppercase border-b-2 border-custom-primary">About us</h3>
                    <h1 class="text-4xl font-serif capitalize tracking-wide">Best fortune hotel</h1>
                    <p class="text-center w-3/4 text-gray-500 text-sm">A 2-star accommodation conveniently located in the heart of Manila, Philippines. Offering excellent amenities and a comfortable stay, it's perfect for both business and leisure travelers.<br><br> Built in 1997, the hotel boasts 90 well-appointed rooms and top-notch service.
                    Located just 0.7 km from the city center and 45 minutes from the airport, it provides easy access to Manila's attractions. Check-in starts at 2 PM, and check-out is until 12 PM. The hotel is family-friendly, offering free stays for children aged 0 to 6. Book your stay today and experience the best of Manila.</p>
                </div>
                <div class="w-1/2 rounded overflow-hidden">
                    <img src="../assets/BFH Counter.jpg" alt="bfh counter" class="w-full aspect-video">
                </div>
            </div>
        </div> -->
    <div class="h-fit bg-gray-100 py-5">
      <div class="w-full max-w-6xl mx-auto p-10">
        <div class="w-full flex flex-col items-center space-y-4">
          <h3
            class="font-medium text-sm font-inter uppercase border-b-2 border-custom-primary"
          >
            About us
          </h3>
          <h1 class="text-4xl font-serif capitalize tracking-wide">
            Best fortune hotel
          </h1>
          <p class="text-center w-3/4 text-gray-500 text-sm">
            A 2-star accommodation conveniently located in the heart of Manila,
            Philippines. Offering excellent amenities and a comfortable stay,
            it's perfect for both business and leisure travelers.<br /><br />
            Built in 1997, the hotel boasts 90 well-appointed rooms and
            top-notch service. Located just 0.7 km from the city center and 45
            minutes from the airport, it provides easy access to Manila's
            attractions. Check-in starts at 2 PM, and check-out is until 12 PM.
            The hotel is family-friendly, offering free stays for children aged
            0 to 6. Book your stay today and experience the best of Manila.
          </p>
        </div>
      </div>
    </div>
    <!-- testimonials -->
    <div
      class="h-fit lg:h-[50dvh] w-full flex flex-col items-center gap-y-14 p-10"
    >
      <div class="flex flex-col items-center gap-y-5">
        <h3
          class="font-medium text-sm font-inter uppercase border-b-2 border-custom-primary"
        >
          Testimonials
        </h3>
        <h1 class="text-3xl font-serif capitalize">What our customer says?</h1>
      </div>
      <div class="w-full max-w-6xl mx-auto space-y-5">
        <div
          v-for="(testi, index) in testimonials"
          :key="index"
          class="w-full lg:w-1/2 mx-auto"
        >
          <div v-if="currentShowing === index" class="space-y-10">
            <p class="text-center text-sm">"{{ testi.testimonial }}"</p>
            <h2
              class="text-center font-medium font-inter tracking-wide capitalize text-gray-500"
            >
              - {{ testi.user }} -
            </h2>
          </div>
        </div>
        <div class="flex justify-center">
          <div v-for="(testi, index) in testimonials" :key="index">
            <Icon
              icon="codicon:circle-filled"
              class="text-sm text-gray-200 duration-700"
              :class="{ '!text-black': currentShowing === index }"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- attractions -->
    <div
      class="h-fit w-full bg-gray-100 flex flex-col items-center gap-y-14 p-10"
    >
      <h1
        class="font-serif text-2xl font-medium border-b-2 border-custom-primary"
      >
        Nearby Attractions
      </h1>
      <div class="grid lg:grid-cols-3 w-full max-w-6xl gap-5">
        <div class="overflow-hidden rounded-md relative">
          <img
            src="../assets/quiapoChurch.jpeg"
            alt="quiapo church"
            class="h-full"
          />
          <div
            class="absolute left-0 top-0 bg-black/10 flex flex-col justify-end space-y-1 w-full h-full p-5"
          >
            <h1 class="text-white text-2xl font-serif">Quiapo Church</h1>
            <p class="text-white text-sm flex items-center gap-x-1 uppercase">
              <Icon icon="mdi:location" class="text-xl" />
              920 m from the hotel
            </p>
          </div>
        </div>
        <div class="overflow-hidden rounded-md relative">
          <img src="../assets/pacoPark.jpeg" alt="paco park" class="h-full" />
          <div
            class="absolute left-0 top-0 bg-black/10 flex flex-col justify-end space-y-1 w-full h-full p-5"
          >
            <h1 class="text-white text-2xl font-serif">Paco Park</h1>
            <p class="text-white text-sm flex items-center gap-x-1 uppercase">
              <Icon icon="mdi:location" class="text-xl" />
              1.09 km from the hotel
            </p>
          </div>
        </div>
        <div class="overflow-hidden rounded-md relative">
          <img
            src="../assets/manilaCathedral.jpeg"
            alt="manila cathedral"
            class="h-full"
          />
          <div
            class="absolute left-0 top-0 bg-black/10 flex flex-col justify-end space-y-1 w-full h-full p-5"
          >
            <h1 class="text-white text-2xl font-serif">Manila Cathedral</h1>
            <p class="text-white text-sm flex items-center gap-x-1 uppercase">
              <Icon icon="mdi:location" class="text-xl" />
              1.18 km from the hotel
            </p>
          </div>
        </div>
        <div class="overflow-hidden rounded-md relative">
          <img
            src="../assets/intramuros.jpeg"
            alt="intramuros"
            class="h-full"
          />
          <div
            class="absolute left-0 top-0 bg-black/10 flex flex-col justify-end space-y-1 w-full h-full p-5"
          >
            <h1 class="text-white text-2xl font-serif">Intramuros</h1>
            <p class="text-white text-sm flex items-center gap-x-1 uppercase">
              <Icon icon="mdi:location" class="text-xl" />
              1.18 km from the hotel
            </p>
          </div>
        </div>
        <div class="overflow-hidden rounded-md relative">
          <img src="../assets/rizalPark.jpg" alt="rizal park" class="h-full" />
          <div
            class="absolute left-0 top-0 bg-black/10 flex flex-col justify-end space-y-1 w-full h-full p-5"
          >
            <h1 class="text-white text-2xl font-serif">Rizal Park</h1>
            <p class="text-white text-sm flex items-center gap-x-1 uppercase">
              <Icon icon="mdi:location" class="text-xl" />
              2.9 km from the hotel
            </p>
          </div>
        </div>
        <div class="overflow-hidden rounded-md relative">
          <img
            src="../assets/fortSantiagojpg.jpg"
            alt="fort santiago"
            class="h-full"
          />
          <div
            class="absolute left-0 top-0 bg-black/10 flex flex-col justify-end space-y-1 w-full h-full p-5"
          >
            <h1 class="text-white text-2xl font-serif">Fort Santiago</h1>
            <p class="text-white text-sm flex items-center gap-x-1 uppercase">
              <Icon icon="mdi:location" class="text-xl" />
              1.18 km from the hotel
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- Frequently askeds questions -->
    <div class="h-fit w-full flex flex-col items-center gap-y-14 p-10">
      <h1
        class="font-serif text-2xl font-medium border-b-2 border-custom-primary"
      >
        Frequently Asked Questions (FAQs)
      </h1>
      <!-- Accordion Item 1 -->
      <div class="w-full max-w-6xl">
        <div
          v-for="(faq, index) in FAQS"
          :key="index"
          class="border-b border-slate-200"
        >
          <button
            @click="toggleAccordion(index)"
            class="w-full flex justify-between items-center py-5 text-slate-800"
          >
            <span class="text-lg">{{ faq.question }}</span>
            <span
              :id="`icon-${index}`"
              class="text-slate-800 transition-transform duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="w-5 h-5"
              >
                <path
                  d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z"
                />
              </svg>
            </span>
          </button>
          <div
            :id="`content-${index}`"
            class="max-h-0 overflow-hidden transition-all duration-300 ease-in-out"
          >
            <div class="pb-5 text-slate-500">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- add testimonials -->
    <div
      v-if="isAuth"
      class="h-fit w-full flex flex-col items-center gap-y-14 p-10"
    >
      <h1
        class="font-serif text-2xl font-medium border-b-2 border-custom-primary"
      >
        Say something about us
      </h1>
      <!-- Accordion Item 1 -->
      <div class="w-full max-w-6xl flex flex-col items-center gap-y-5">
        <textarea
          class="border border-gray-300 rounded w-1/2 min-h-32 p-2"
          v-model="testimonial"
        ></textarea>
        <button
          @click="submitTestimonials"
          class="bg-red-500 w-1/2 text-white rounded py-1 hover:bg-red-600"
          :disabled="adding"
          :class="{ 'animate-pulse': adding }"
        >
          {{ !adding ? "Add" : "Adding" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store";
import { db } from "../config/firebaseConfig";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";

const store = useAuthStore();

const currentUser = computed(() => store.user);
const isAuth = computed(() => store.isAuth);

const router = useRouter();

onMounted(() => {
  runSlider();
  getPromos();
});

const minDate = new Date().toISOString().split("T")[0];

const checkInDate = ref("");
const checkOutDate = ref("");
const guests = ref("");

const checkAvailability = () => {
  router.push({
    name: "rooms",
    query: {
      checkIn: checkInDate.value,
      checkOut: checkOutDate.value,
      guests: guests.value,
    },
  });
};

const currentShowing = ref(0);

const runSlider = () => {
  setInterval(() => {
    if (currentShowing.value + 1 === testimonials.value.length)
      return (currentShowing.value = 0);
    currentShowing.value++;
  }, 3000);
};

// get promos
const promos = ref([]);

const promosRef = collection(db, "promos");

const getPromos = async () => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const q = query(promosRef, where("end", ">", today));

    const snapshots = await getDocs(q);

    snapshots.docs.forEach((doc) => {
      promos.value.push({
        id: doc.id,
        ...doc.data(),
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const FAQS = ref([
  {
    question: "What types of rooms are available?",
    answer:
      "We offer a variety of room types to suit different preferences, including [list room types, e.g., standard, deluxe, suites]. Each room is designed for your comfort and convenience.",
  },
  {
    question: "Do the rooms have Wi-Fi?",
    answer:
      "Yes, all rooms and public areas in our hotel are equipped with complimentary Wi-Fi for your convenience.",
  },
  {
    question: "What amenities are available at the hotel?",
    answer:
      "While we don’t currently offer additional on-site amenities, our focus is on providing clean, comfortable, and affordable accommodations.",
  },
  {
    question: "Do you provide room service?",
    answer:
      "Yes, room service is available during [insert specific hours, e.g., 7:00 AM to 10:00 PM]. Enjoy a selection of meals and snacks delivered directly to your room.",
  },
  {
    question: "Do you have on-site restaurants?",
    answer:
      "We do not have an on-site restaurant, but there are several excellent dining options within walking distance of the hotel. Our staff will be happy to recommend nearby restaurants.",
  },
  {
    question: "What safety measures are in place at the hotel?",
    answer:
      "Your safety is our priority. Our hotel is equipped with [list safety features, e.g., 24/7 security, CCTV surveillance, and smoke detectors].",
  },
  {
    question: "What should I do in case of an emergency?",
    answer:
      "Please contact the front desk immediately for assistance. Evacuation routes and emergency instructions are clearly displayed in every room for your reference.",
  },
]);

const toggleAccordion = (index) => {
  const content = document.getElementById(`content-${index}`);
  const icon = document.getElementById(`icon-${index}`);

  const minusSVG = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
        <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
        </svg>
    `;

  const plusSVG = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
        <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
        </svg>
    `;

  if (content.style.maxHeight && content.style.maxHeight !== "0px") {
    content.style.maxHeight = "0";
    icon.innerHTML = plusSVG;
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
    icon.innerHTML = minusSVG;
  }
};

const testimonial = ref("");
const adding = ref(false);

const testimonialsRef = collection(db, "testimonials");

const submitTestimonials = async () => {
  try {
    adding.value = true;
    await addDoc(testimonialsRef, {
      testimonial: testimonial.value,
      user: currentUser?.value?.displayName,
    });

    testimonial.value = "";
    getTestimonials()
  } catch (error) {
    console.log(error);
  } finally {
    adding.value = false;
  }
};

// testimonials slider
const testimonials = ref([]);

const getTestimonials = async () => {
  try {
    const snapshots = await getDocs(testimonialsRef);

    snapshots.docs.forEach((doc) => {
      testimonials.value.push({
        id: doc.id,
        ...doc.data(),
      });
    });
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
    getTestimonials()
})
</script>
