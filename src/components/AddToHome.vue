<template>
  <button @click="handleAddToHomeScreenClick">Add to Home Screen</button>
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount, defineComponent } from 'vue';

export default defineComponent({
  name: 'AddToHomeScreen',
  setup() {
    const deferredPrompt = ref(null);
    const isIOS = ref(/iPad|iPhone|iPod/.test(navigator.userAgent));

    const handleBeforeInstallPrompt = e => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();

      // Store the event for later use
      deferredPrompt.value = e;
    };

    const handleAddToHomeScreenClick = async () => {
      if (deferredPrompt.value) {
        // Show the install prompt
        deferredPrompt.value.prompt();

        // Wait for the user to respond to the prompt
        const choiceResult = await deferredPrompt.value.userChoice;
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        deferredPrompt.value = null;
      } else if (isIOS.value) {
        // Here we could notify the user to guide them in order to add the app to Home Screen.
        // You can update your UI to render a notification, popin, alert...
        console.log(
          "To add this web app to your Home Screen, open this app in Safari and tap the Share button, then select 'Add to Home Screen'.",
        );
      } else {
        console.log('Install prompt is not available');
      }
    };

    onMounted(() => {
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    });

    onBeforeUnmount(() => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
    });

    return {
      handleAddToHomeScreenClick,
      isIOS,
    };
  },
});
</script>
