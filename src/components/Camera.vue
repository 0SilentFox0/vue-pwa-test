<template>
  <div>
    <button @click="startCamera">Start Camera</button>
    <video ref="video" autoplay />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'CameraAccess',
  setup() {
    const stream = ref<MediaStream | null>(null);
    const startCamera = async () => {
      try {
        stream.value = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (stream.value) {
          const videoElement = document.getElementById(
            'video',
          ) as HTMLVideoElement;
          videoElement.srcObject = stream.value;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    const beforeUnmount = () => {
      if (stream.value) {
        stream.value.getTracks().forEach(track => track.stop());
      }
    };

    return {
      startCamera,
      beforeUnmount,
    };
  },
});
</script>

<style scoped>
/* Add your styles here */
</style>
