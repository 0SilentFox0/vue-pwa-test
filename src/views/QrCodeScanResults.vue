<template>
  <div class="p-4">
    <div v-if="!isPwa">
      <h1>Deze QR code kan alleen binnen BrightBirds gescanned worden</h1>
      <p>
        Open de app 'BrightBirds' en gebruik dan de QR-code scannen binnen de
        applicatie.
      </p>
      <p>
        Heb je de applicatie nog niet geintalleerd?
        <a href="/install">Installeer deze dan eerst.</a>
      </p>
    </div>
    <div v-if="isPwa">
      <div class="flex">
        <div class="flex-none p-4 w-32 h-32">
          <img src="/qrcode.jpg" />
        </div>
        <div class="flex-grow">
          <h1 class="mb-0">Resultaten van de QR scan</h1>
          <button @click="goToQrCodeScanner">Nogmaals scannen</button>
        </div>
      </div>
      <hr class="mt-4 mb-4" />
      <h2>Het scannen van de QR-code leverde het volgende op:</h2>
      <p class="mt-4 mb-4">
        {{ qrdata }}
      </p>
      <p class="mt-4 mb-4">
        Deze gegevens worden normaliter naar de API / backend gestuurd. Aan de
        hand van de resultaten kan een melding gegeven worden dat de QR code
        niet meer geldig is, of de resultaten verwerkt en doorgestuurd worden.
        Deeplinking wordt ook ondersteund op Android; hij opent deze pagina in
        de PWA. iOS geeft een melding dat er gescand moet worden binnen de
        applicatie.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'QrCodeScanResults',
  components: {},
  setup() {
    const route = useRoute();
    const router = useRouter();
    const qrdata = ref<any>(null);
    const isPwa = ref(false);

    qrdata.value = route.query?.qrdata;

    if (window.matchMedia('(display-mode: standalone)').matches) {
      isPwa.value = true;
    }

    const goToQrCodeScanner = () => {
      router.push('/qr');
    };

    return {
      goToQrCodeScanner,
      qrdata,
      isPwa,
    };
  },
});
</script>
