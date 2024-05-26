<template>
  <div class="container mx-auto bg-gradient-to-r from-white to-amber-50">
    <nav v-if="!hideMenu">
      <router-link to="/"> Home </router-link>
      |
      <router-link to="/camera-instruction"> Camera </router-link>
      |
      <router-link to="/qr-instruction"> Qr </router-link>
      |
      <router-link to="/video-instruction"> Video </router-link>
      |
      <router-link to="/push"> push </router-link>
    </nav>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'HomeView',
  components: {},
  setup() {
    const isPwa = ref(false);
    const hideMenu = ref(false);
    const route = useRoute();

    if (window.matchMedia('(display-mode: standalone)').matches) {
      isPwa.value = true;
    }

    watch(route, () => {
      hideMenu.value = route.name === 'install';
    });

    return {
      isPwa,
      hideMenu,
    };
  },
  data() {},
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  .content {
    text-align: left;
  }
}

// .main-wrapper {
//   display: flex;
//   flex-direction: column;
// }

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
