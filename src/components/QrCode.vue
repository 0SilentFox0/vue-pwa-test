<template>
  <h1>Scan van QR code</h1>
  <div id="qr-code-full-region" />
</template>

<script lang="ts">
// References:
// https://github.com/mebjas/html5-qrcode/issues/332
// https://scanapp.org/html5-qrcode-docs/docs/intro

import { defineComponent, onMounted, ref } from 'vue';

import { Html5Qrcode } from 'html5-qrcode';

export default defineComponent({
  props: {
    qrbox: {
      type: Number,
      default: 250,
    },
    fps: {
      type: Number,
      default: 10,
    },
  },
  emits: ['result'],
  setup(props, { emit }) {
    const decodedResultData = ref(null);
    const decodedTextData = ref<any>(null);

    let html5QrcodeScanner: any = null;

    const onScanSuccess = (decodedText: string, decodedResult: any) => {
      decodedResultData.value = decodedResult;
      decodedTextData.value = decodedText;
      html5QrcodeScanner.stop();
      emit('result', decodedText);
    };

    onMounted(() => {
      const config = { fps: 10, qrbox: { width: 250, height: 250 } };
      html5QrcodeScanner = new Html5Qrcode('qr-code-full-region');

      html5QrcodeScanner.start(
        { facingMode: 'environment' },
        config,
        onScanSuccess,
      );
    });

    return {
      decodedResultData,
      decodedTextData,
    };
  },
});
</script>
