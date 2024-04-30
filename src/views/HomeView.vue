<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Camera />
    <QrCode />
  </div>
</template>

<script lang="ts">
import Camera from '@/components/Camera.vue';
import QrCode from '@/components/QrCode.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    Camera,
    QrCode,
  },
});
</script>
