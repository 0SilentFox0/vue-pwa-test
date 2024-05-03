import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import pwaConfig from './pwa.config';

const isRunningInWsl = process.env.HOST_OS === 'Windows_NT';

// https://vitejs.dev/config/
export default defineConfig((x) => ({
  envPrefix: 'PUBLIC_',
  envDir: path.resolve(__dirname, './env'),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [vue(), VitePWA(pwaConfig)],
  server: {
    watch: {
      // use polling when running in wsl container. see: https://vitejs.dev/guide/troubleshooting.html#vite-does-not-detect-a-file-change
      usePolling: isRunningInWsl,
    },
  },
}));
