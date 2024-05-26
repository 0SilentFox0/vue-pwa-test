<template>
  <div>
    <div v-if="isPwa">
      <h1>Brightbirds</h1>
      <p>De applicatie is geinstalleerd en actief.</p>
    </div>
    <button
      v-if="!isPwa"
      @click="installPwa">
      Ga naar de installatiepagina.
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'HomeView',
  components: {},
  setup() {
    const isPwa = ref(false);
    const router = useRouter();

    if (window.matchMedia('(display-mode: standalone)').matches) {
      isPwa.value = true;
    }

    const installPwa = () => {
      router.push('/install');
    };

    return {
      isPwa,
      installPwa,
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
