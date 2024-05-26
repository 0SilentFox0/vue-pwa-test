<template>
  <div class="home">
    <div class="camera-wrapper">
      <QrCode
        :qrbox="250"
        :fps="10"
        style="width: 300px"
        @result="onScan" />
    </div>
  </div>
</template>

<script lang="ts">
import QrCode from '@/components/QrCode.vue';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'HomeView',
  components: {
    QrCode,
  },
  setup() {
    const scanResult = ref(null);
    const router = useRouter();

    const onScan = (decodedText: string) => {
      // At this point, we should receive the result from the scanned value.
      // redirect to the scanresult page.
      // At that page, it should make a call to the api to try to collect the scan.
      // In reality, more types of flows using QR-codes can be used, so we should determine the final action.

      // qr-result

      // scanResult.value = decodedText;

      router.push({ name: 'qrResult', query: { qrdata: decodedText } });
    };
    return {
      onScan,
      scanResult,
    };
  },
});
</script>

<style scoped>
.camera-wrapper {
  margin: 0 auto;
  width: 300px;
  height: 300px;
}
</style>
