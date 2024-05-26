import vue from '@vitejs/plugin-vue';
import { fork } from 'node:child_process';
import fs from 'node:fs';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import pwaConfig from './pwa.config';

const isRunningInWsl = process.env.HOST_OS === 'Windows_NT';
const envDir = path.resolve(__dirname, './env');

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, envDir, '');
  if (command === 'serve' && env.NO_PUSH_SERVER?.toUpperCase() !== 'TRUE') {
    startPushDevelopmentServer();
  }

  return {
    envPrefix: 'PUBLIC_',
    envDir,
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
  };
});

function startPushDevelopmentServer() {
  const serverDir = path.resolve(__dirname, 'push-server');
  const serverNodeModules = path.resolve(serverDir, 'node_modules');

  if (!fs.existsSync(serverNodeModules)) {
    console.error(
      '\x1b[31m%s\x1b[90m\x1b[40m%s\x1b[0m\x1b[31m%s\x1b[0m',
      'Please run ',
      'cd push-server; npm install',
      ' first.',
    );
    process.exit(1);
  }

  const serverFile = path.resolve(serverDir, 'server.js');

  fork(serverFile);
}
