<template>
  <div class="home">
    <div class="camera-wrapper">
      <Camera />
    </div>
  </div>
</template>

<script lang="ts">
import Camera from '@/components/Camera.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    Camera,
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
