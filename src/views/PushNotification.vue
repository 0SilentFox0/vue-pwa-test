<template>
  <div>
    <div>
      <button @click="sendNotifcation">Send notification</button>
    </div>
    <button @click="sendMessageToWorker">Send message to worker</button>
    <div>{{ testWorkerMessageMessage }}</div>
  </div>
</template>

<script setup lang="ts">
import TestWorkerMessage from '@/worker/test-worker-message?worker';
import { onBeforeMount, ref } from 'vue';

const testWorkerMessage = new TestWorkerMessage();
const testWorkerMessageMessage = ref('');

const sendNotifcation = async () => {
  const permission = await globalThis.Notification.requestPermission();
  if (['denied', 'default'].includes(permission)) {
    globalThis.alert('PERMISSION DENIED!');
    return;
  }
  new Notification('test');
};

const sendMessageToWorker = () => {
  testWorkerMessage.postMessage('ping');
};

onBeforeMount(() => {
  testWorkerMessage.addEventListener('message', (msg) => {
    testWorkerMessageMessage.value = msg.data.msg;
  });
});
</script>
