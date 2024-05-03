<template>
  <div class="home">
    <div class="camera-wrapper">
      <TakeVideo
        v-model="videoUrl"
        :upload-url="uploadUrl" />
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
  data() {
    return {
      videoUrl: null,
      uploadUrl: 'mister-recorder.herokuapp.com',
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
