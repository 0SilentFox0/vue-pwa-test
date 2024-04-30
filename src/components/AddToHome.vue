<template>
  <div>
    <button
      v-if="isIos && isIos.length && showBtn"
      ref="addBtn"
      class="add-button"
      @click="clickCallback">
      Add
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  setup() {
    const deferredPrompt = ref(null);

    const isIos = navigator.userAgent.match(/iPhone|iPad|iPod/i);
    const showBtn = ref(false);

    const captureEvent = () => {
      window.addEventListener('beforeinstallprompt', e => {
        // ! Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt.value = e;
      });
    };

    const clickCallback = () => {
      if (deferredPrompt.value) {
        deferredPrompt.value.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.value.userChoice.then(choiceResult => {
          if (choiceResult.outcome === 'accepted') {
            // Call another function?
          }
          deferredPrompt.value = null;
        });
      }
    };

    onMounted(() => {
      showBtn.value = true;
      captureEvent();
    });

    return {
      deferredPrompt,
      clickCallback,
      isIos,
      showBtn,
    };
  },
});
</script>
