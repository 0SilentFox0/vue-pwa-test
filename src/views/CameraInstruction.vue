<template>
  <div class="p-4">
    <div class="flex">
      <div class="flex-none p-4 w-32 h-32">
        <img src="/qrcode.jpg" />
      </div>
      <div class="flex-grow">
        <h1 class="mb-0">Camera</h1>
        <button @click="checkPermissions">Start camera</button>
      </div>
    </div>
    <hr class="mt-4 mb-4" />
    <p v-if="errorInfo">{{ errorInfo }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isAllowed = ref(false);
const errorInfo = ref('');
const router = useRouter();

const checkPermissions = async () => {
  try {
    await navigator.mediaDevices.getUserMedia({ video: true });
    isAllowed.value = true;
    errorInfo.value = '';
    router.push('/camera');
  } catch (err) {
    isAllowed.value = false;
    errorInfo.value =
      'Camera access denied. Please allow camera access to use this feature.';
  }
};
</script>
