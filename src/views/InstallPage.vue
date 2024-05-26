<template>
  <div class="p-4">
    <div class="flex">
      <div class="flex-none p-4 w-32 h-32">
        <img src="/test.png" />
      </div>
      <div class="flex-grow">
        <h1 class="mb-0">BrightBirds POC</h1>
        <p class="mt-0">Kleine POC van Brightbirds</p>
        <button
          v-if="!isAlreadyInstalled"
          @click="openInstallWindow">
          Installeer
        </button>
        <p
          v-if="isAlreadyInstalled"
          class="font-bold">
          De applicatie is al geinstalleerd
        </p>
      </div>
    </div>
    <hr class="mt-4 mb-4" />
    <h2>Over Brightbirds</h2>
    <p>
      Halvah cotton candy caramels jelly-o liquorice liquorice croissant danish.
      Biscuit sweet roll liquorice dessert tootsie roll topping icing. Chocolate
      cake marzipan caramels shortbread marshmallow ice cream ice cream.
      Tiramisu muffin biscuit chocolate cake jelly. Marshmallow tootsie roll
      powder jelly-o gummies icing pie gummies jelly beans. Tootsie roll chupa
      chups chocolate bar sweet cake pudding. Ice cream macaroon tootsie roll
      candy chocolate bar gingerbread biscuit sweet roll toffee. Biscuit carrot
      cake caramels chocolate cake halvah tiramisu gummi bears macaroon.
      Liquorice danish chocolate bar wafer chocolate. Toffee cookie gingerbread
      donut candy canes oat cake candy canes.
    </p>
    <h2>Meer informatie?</h2>
    <p>
      Danish sweet lemon drops jujubes sesame snaps icing. Tiramisu danish
      dessert candy canes sugar plum. Tootsie roll pudding tart tart cake.
      Cheesecake marzipan apple pie sugar plum lemon drops shortbread shortbread
      sweet. Lemon drops icing tootsie roll powder toffee cake tiramisu pastry.
      Danish bonbon toffee cake sesame snaps dessert chupa chups. Jelly beans
      pastry oat cake gingerbread icing cake.
    </p>

    <div
      v-if="show"
      class="fixed top-0 bottom-0 left-0 right-0 bg-opacity-75 bg-black"
      @click="show = false">
      <div class="fixed bottom-9 left-0 right-0">
        <div class="information-ios-box">
          <div class="p-4">
            <div class="flex items-center justify-center">
              <div class="flex-none">
                <svg
                  class="text-center"
                  width="25"
                  height="32"
                  viewBox="0 0 17.695 26.475">
                  <g fill="currentColor">
                    <path
                      d="M17.334 10.762v9.746c0 2.012-1.025 3.027-3.066 3.027H3.066C1.026 23.535 0 22.52 0 20.508v-9.746C0 8.75 1.025 7.734 3.066 7.734h2.94v1.573h-2.92c-.977 0-1.514.527-1.514 1.543v9.57c0 1.015.537 1.543 1.514 1.543h11.152c.967 0 1.524-.527 1.524-1.543v-9.57c0-1.016-.557-1.543-1.524-1.543h-2.91V7.734h2.94c2.04 0 3.066 1.016 3.066 3.028Z" />
                    <path
                      d="M8.662 15.889c.42 0 .781-.352.781-.762V5.097l-.058-1.464.654.693 1.484 1.582a.698.698 0 0 0 .528.235c.4 0 .713-.293.713-.694 0-.205-.088-.361-.235-.508l-3.3-3.183c-.196-.196-.362-.264-.567-.264-.195 0-.361.069-.566.264L4.795 4.94a.681.681 0 0 0-.225.508c0 .4.293.694.703.694.186 0 .4-.079.538-.235l1.474-1.582.664-.693-.058 1.465v10.029c0 .41.351.762.771.762Z" />
                  </g>
                </svg>
              </div>
              <div class="flex-grow">
                <p class="install-description">
                  Druk op delen in de navigatiebalk
                </p>
              </div>
            </div>
            <div class="flex items-center justify-center mt-3">
              <div class="flex-none">
                <svg
                  id="pwa-add"
                  width="25"
                  height="25">
                  <g>
                    <path
                      d="m23.40492,1.60784c-1.32504,-1.32504 -3.19052,-1.56912 -5.59644,-1.56912l-10.65243,0c-2.33622,0 -4.2017,0.24408 -5.5267,1.56912c-1.32504,1.34243 -1.56911,3.17306 -1.56911,5.50924l0,10.5827c0,2.40596 0.22665,4.254 1.55165,5.57902c1.34246,1.32501 3.19052,1.5691 5.59647,1.5691l10.60013,0c2.40592,0 4.2714,-0.24408 5.59644,-1.5691c1.325,-1.34245 1.55166,-3.17306 1.55166,-5.57902l0,-10.51293c0,-2.40596 -0.22666,-4.25401 -1.55166,-5.57901zm-0.38355,5.21289l0,11.24518c0,1.51681 -0.20924,2.94643 -1.02865,3.78327c-0.83683,0.83685 -2.30134,1.0635 -3.81815,1.0635l-11.33234,0c-1.51681,0 -2.96386,-0.22665 -3.80073,-1.0635c-0.83683,-0.83684 -1.04607,-2.26646 -1.04607,-3.78327l0,-11.19288c0,-1.5517 0.20924,-3.01617 1.02865,-3.85304c0.83687,-0.83683 2.31876,-1.04607 3.87042,-1.04607l11.28007,0c1.51681,0 2.98132,0.22666 3.81815,1.06353c0.81941,0.81941 1.02865,2.26645 1.02865,3.78327zm-10.53039,12.08205c0.64506,0 1.02861,-0.43586 1.02861,-1.13326l0,-4.34117l4.53294,0c0.66252,0 1.13326,-0.36613 1.13326,-0.99376c0,-0.64506 -0.43586,-1.02861 -1.13326,-1.02861l-4.53294,0l0,-4.53294c0,-0.6974 -0.38355,-1.13326 -1.02861,-1.13326c-0.62763,0 -0.99376,0.45332 -0.99376,1.13326l0,4.53294l-4.51552,0c-0.69737,0 -1.15069,0.38355 -1.15069,1.02861c0,0.62763 0.48817,0.99376 1.15069,0.99376l4.51552,0l0,4.34117c0,0.66252 0.36613,1.13326 0.99376,1.13326z" />
                  </g>
                </svg>
              </div>
              <div class="flex-grow">
                <p class="install-description">Druk op 'Zet op beginscherm'</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
export default defineComponent({
  setup() {
    const isPwa = ref(false);
    const deferredPrompt = ref(null);
    const show = ref(false);
    const isAlreadyInstalled = ref(false);
    var isIOS =
      // @ts-ignore

      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (window.matchMedia('(display-mode: standalone)').matches) {
      isPwa.value = true;
    }

    onMounted(() => {
      // ios doesn't support it yet, and
      // android 12 and 13 will have a bug so it doesn't show the values
      // properly. Besides that, it's a fun thing....
      // if (navigator.getInstalledRelatedApps) {
      //   navigator.getInstalledRelatedApps().then((relatedApps) => {
      //     infoData.value = relatedApps;
      //     if (relatedApps.length > 0) {
      //       isAlreadyInstalled.value = true;
      //     }
      //   });
      // }
    });

    const openInstallWindow = async () => {
      if (isIOS) {
        show.value = true;
      } else {
        await installPwa();
      }
    };

    const installPwa = async () => {
      if (deferredPrompt.value !== null) {
        // @ts-ignore
        deferredPrompt.value.prompt();
        // @ts-ignore
        const { outcome } = await deferredPrompt.value.userChoice;
        if (outcome === 'accepted') {
          deferredPrompt.value = null;
        }
      }
    };

    window.addEventListener('beforeinstallprompt', (e) => {
      // @ts-ignore
      deferredPrompt.value = e;
    });

    return {
      isPwa,
      show,
      installPwa,
      isAlreadyInstalled,
      openInstallWindow,
    };
  },
});
</script>

<style scoped lang="scss">
h2 {
  font-size: 16px;
  margin-bottom: 8px;
}

p {
  font-size: 12px;
  line-height: 20px;

  &.install-description {
    margin-bottom: 0;
    font-size: 16px;
    margin-left: 10px;
    line-height: 25px;
  }
}

.information-ios-box {
  position: relative;
  background: #ffffff;
  border: 1px solid #000;
}

.information-ios-box:after,
.information-ios-box:before {
  top: 100%;
  left: 50%;
  border: solid transparent;
  content: '';
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.information-ios-box:after {
  border-color: rgba(255, 255, 255, 0);
  border-top-color: #ffffff;
  border-width: 35px;
  margin-left: -35px;
}

.information-ios-box:before {
  border-color: rgba(255, 255, 255, 0);
  border-top-color: #000;
  border-width: 36px;
  margin-left: -36px;
}
</style>
<!-- 
<style scoped lang="scss">
.container {
  text-align: center;
  display: flex;
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  height: 100dvh;
  width: 100dvw;
  justify-content: center;
  align-items: end;
  > div {
    $border-style: 1px solid black;
    $margin-bottom: 1.5rem;
    z-index: 2;
    border: $border-style;
    border-radius: 1rem;
    width: clamp(200px, 50dvw, 600px);
    padding: 1rem;
    margin-bottom: $margin-bottom;

    &::after {
      content: '';
      position: fixed;
      left: 50%;
      bottom: 0;
      padding: calc($margin-bottom / 2);
      z-index: 2;
      background-color: white;
      border-bottom: $border-style;
      border-right: $border-style;
      margin-bottom: calc($margin-bottom / 2);
      // translateX(-50%) is center of parent. See: https://stackoverflow.com/a/38796408/11463241
      transform: translateX(-50%) rotate(45deg);
    }
  }
}
</style> -->
