<template>
  <div class="home">
    <div class="camera-wrapper">
      <QrCode />
    </div>
  </div>
</template>

<script lang="ts">
import QrCode from '@/components/QrCode.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    QrCode,
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
