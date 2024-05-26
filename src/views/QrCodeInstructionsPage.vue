<template>
  <div class="p-4">
    <div class="flex">
      <div class="flex-none p-4 w-32 h-32">
        <img src="/qrcode.jpg" />
      </div>
      <div class="flex-grow">
        <h1 class="mb-0">Scannen van QR Code</h1>
        <button @click="goToQrCodeScanner">Start met scannen</button>
      </div>
    </div>
    <hr class="mt-4 mb-4" />
    <h2>De opdracht</h2>
    <p>Her en der vind je QR-codes verstopt. Scan de QR-code voor de punten.</p>
    <p>{{ errorInfo }}</p>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { Html5Qrcode } from 'html5-qrcode';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'HomeView',
  components: {},
  setup() {
    const router = useRouter();
    const errorInfo = ref(null);

    const goToQrCodeScanner = () => {
      Html5Qrcode.getCameras()
        .then(() => {
          router.push('/qr');
        })
        .catch((error) => {
          errorInfo.value = error;
        });
    };

    const onScan = (decodedText: string, decodedResult: any) => {
      console.log(decodedText);
      console.log(decodedResult);
    };
    return {
      goToQrCodeScanner,
      errorInfo,
      onScan,
    };
  },
});
</script>
