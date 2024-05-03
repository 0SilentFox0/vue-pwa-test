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
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/CameraPage.vue'),
  },
  {
    path: '/video',
    name: 'video',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/VideoPage.vue'),
  },
  {
    path: '/qr',
    name: 'qr',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/QrCodePage.vue'),
  },
  {
    path: '/push',
    name: 'push',
    component: () => import('../views/PushNotification.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
