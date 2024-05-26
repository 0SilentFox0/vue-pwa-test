import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/camera',
    name: 'camera',
    component: () => import('../views/CameraPage.vue'),
  },
  {
    path: '/camera-instruction',
    name: 'cameraInstruction',
    component: () => import('../views/CameraInstruction.vue'),
  },
  {
    path: '/video',
    name: 'video',
    component: () => import('../views/VideoPage.vue'),
  },
  {
    path: '/video-instruction',
    name: 'videoInstruction',
    component: () => import('../views/VideoInstruction.vue'),
  },
  {
    path: '/qr',
    name: 'qr',
    component: () => import('../views/QrCodePage.vue'),
  },
  {
    path: '/qr-instruction',
    name: 'qrInstruction',
    component: () => import('../views/QrCodeInstructionsPage.vue'),
  },
  {
    path: '/qr-result',
    name: 'qrResult',
    component: () => import('../views/QrCodeScanResults.vue'),
  },
  {
    path: '/push',
    name: 'push',
    component: () => import('../views/PushNotification.vue'),
  },
  {
    path: '/install',
    name: 'install',
    component: () => import('@/views/InstallPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
