<template>
  <div class="home">IS PWA - {{ isPwa }}</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'HomeView',
  components: {},
  setup() {
    const isPwa = ref(false);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      isPwa.value = true;
    }

    return {
      isPwa,
    };
  },
});
</script>

<style>
.camera-wrapper {
  width: 300px;
  height: 300px;
}
</style>
