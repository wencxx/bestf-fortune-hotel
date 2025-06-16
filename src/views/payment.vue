<template>
  <div
    class="h-screen flex flex-col items-center justify-center bg-gray-50 py-10"
  >
    <div
      class="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center w-full max-w-md"
    >
      <h2 class="text-2xl font-bold mb-4 text-center">Scan to Pay</h2>
      <img
        src="/src/assets/Gcash QR.jpg"
        alt="GCash QR Code"
        class="w-64 h-64 object-contain border mb-6 rounded"
      />
      <!-- Add GCash number below QR code -->
      <div class="mb-6 text-center text-gray-700">
        Can't scan? Send payment to GCash number:<br />
        <span class="font-semibold text-lg">09091777324</span>
      </div>
      <form @submit.prevent="submitPayment" class="w-full flex flex-col gap-4">
        <label class="font-medium">Reference Number</label>
        <input
          v-model="referenceNumber"
          type="text"
          required
          maxlength="13"
          minlength="13"
          pattern="\d{13}"
          placeholder="Enter 13-digit Reference Number"
          class="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          @input="onInput"
        />
        <button
          type="submit"
          :disabled="loading"
          class="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {{ loading ? "Submitting..." : "Submit Payment" }}
        </button>
      </form>
      <div v-if="error" class="text-red-500 mt-2 text-center">{{ error }}</div>
      <div v-if="success" class="text-green-600 mt-2 text-center">
        Payment submitted! The admin will review your payment. Once confirmed,
        you will receive an email notification.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { db } from "../config/firebaseConfig";
import { updateDoc, doc } from "firebase/firestore";

const referenceNumber = ref("");
const loading = ref(false);
const error = ref("");
const success = ref(false);
const route = useRoute();

const onInput = (e) => {
  // Only allow digits and limit to 13 characters
  referenceNumber.value = e.target.value.replace(/\D/g, "").slice(0, 13);
};

const submitPayment = async () => {
  loading.value = true;
  error.value = "";
  success.value = false;
  try {
    // Validate: must be exactly 13 digits
    if (!/^\d{13}$/.test(referenceNumber.value)) {
      throw new Error("Reference number must be exactly 13 digits.");
    }
    const bookingId = route.params.id;
    if (!bookingId) throw new Error("Booking ID not found in route params");
    await updateDoc(doc(db, "booking", bookingId), {
      referenceNumber: referenceNumber.value,
      mop: "GCASH",
      status: "paid",
    });
    success.value = true;
    referenceNumber.value = "";
  } catch (e) {
    error.value = e.message || "An error occurred";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped></style>
