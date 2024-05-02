<template>
  <div class="home">
    <div class="camera-wrapper">
      <TakeVideo />
    </div>
  </div>
</template>

<script lang="ts">
import TakeVideo from '@/components/TakeVideo.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    TakeVideo,
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
