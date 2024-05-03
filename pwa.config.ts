import { minimal2023Preset } from '@vite-pwa/assets-generator/config';
import path from 'path';
import type { VitePWAOptions } from 'vite-plugin-pwa';

export default {
  // see: https://vite-pwa-org.netlify.app/guide/inject-manifest.html#plugin-configuration
  // strategies: 'injectManifest',
  injectRegister: 'auto',

  // see: https://vite-pwa-org.netlify.app/guide/inject-manifest.html#plugin-configuration-2
  srcDir: path.resolve(__dirname, 'src', 'worker'),
  filename: 'serviceWorker.ts',

  registerType: 'autoUpdate',
  devOptions: {
    enabled: true,
    type: 'module',
    navigateFallback: 'index.html',
  },
  includeAssets: [],
  manifest: {
    name: 'My Awesome App',
    short_name: 'MyApp',
    description: 'My Awesome App description',
    theme_color: '#ffffff',
  },
  // injectManifest: {
  //   // see: https://vite-pwa-org.netlify.app/guide/inject-manifest.html#service-worker-code
  //   // todo: use precaching?
  //   // injectionPoint: undefined,
  // },
  // see: https://vite-pwa-org.netlify.app/assets-generator/integrations.html#pwa-assets-options
  pwaAssets: {
    disabled: false,
    preset: {
      ...minimal2023Preset,
    },
    htmlPreset: '2023',

    image: 'public/test.png',
  },
} as const satisfies Partial<VitePWAOptions>;
