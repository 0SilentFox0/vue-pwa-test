<template>
  <div>
    <label>UserName <input v-model="state.push.userName" /> </label>
    <button
      :disabled="
        state.push.subscriptionState === 'Subscribing' ||
        !state.push.userName ||
        state.push.oldUserName === state.push.userName
      "
      @click="subsribeToPushMessages">
      Subscribe to push messages
    </button>

    <h4>Subscribers:</h4>

    <div
      v-for="subscriber in state.push.subscribers"
      :key="subscriber">
      <label>
        <input
          v-model="state.push.selectedSubscribers"
          type="checkbox"
          :value="subscriber" />
        {{ subscriber }}
      </label>
    </div>

    <button
      :disabled="state.push.subscribers.length === 0"
      @click="pushNotificationApi.deleteAllSubscriptionRecords()">
      Clear
    </button>

    <div>
      <label
        >Payload
        <input
          v-model="state.push.payload"
          type="text"
      /></label>

      <button
        :disabled="state.push.selectedSubscribers.length === 0"
        @click="sendPushMessage">
        Send PushMessage
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SubscriptionViewModel } from '@/generated/http-client';
import { pushNotificationApi } from '@/http';
import { onBeforeMount, onBeforeUnmount, reactive } from 'vue';

const state = reactive({
  push: {
    oldUserName: undefined as string | undefined,
    userName: '',
    subscriptionState: 'NotSubscribed' as SubscriptionState,
    subscribers: [] as ReadonlyArray<string>,
    selectedSubscribers: [] as string[],
    payload: '',
    delay: 0,
  },
});

const subsribeToPushMessages = async () => {
  if (state.push.subscriptionState === 'Subscribing' || !state.push.userName)
    return;

  if ((await Notification.requestPermission()) !== 'granted') return;

  state.push.subscriptionState = 'Subscribing';

  try {
    await subsribeToPushMessagesCore(
      state.push.userName,
      state.push.oldUserName,
    );
    state.push.subscriptionState = 'Subscribed';
  } catch (error) {
    state.push.subscriptionState = 'NotSubscribed';
    throw error;
  }
};

const sendPushMessage = () => {
  return pushNotificationApi.sendPushMessage({
    message: state.push.payload,
    toUserIds: state.push.selectedSubscribers,
  });
};

let getSubscribersIntervalId: number | undefined = undefined;
onBeforeMount(async () => {
  const existingSubscription = await getExistingPushSubscription();

  if (existingSubscription) {
    state.push.userName = existingSubscription.userName;
    state.push.oldUserName = existingSubscription.userName;
    state.push.subscriptionState = 'Subscribed';
  }

  const getSubscribersOnInterval = async () => {
    state.push.subscribers = (
      await pushNotificationApi.getAllPushSubscribers()
    ).data;

    if (
      state.push.oldUserName &&
      !state.push.subscribers.includes(state.push.oldUserName)
    )
      state.push.oldUserName = undefined;

    getSubscribersIntervalId = window.setTimeout(
      getSubscribersOnInterval,
      1000,
    );
  };
  getSubscribersOnInterval();
});

onBeforeUnmount(() => {
  window.clearInterval(getSubscribersIntervalId);
});
</script>

<script lang="ts">
const localStorageUserIdKey = 'userId';
type SubscriptionState = 'NotSubscribed' | 'Subscribing' | 'Subscribed';

const subsribeToPushMessagesCore = async (
  userId: string,
  oldUserName?: string,
) => {
  const registration = await navigator.serviceWorker.ready;

  // Delete current subscription.
  const existingSubscription = await registration.pushManager.getSubscription();
  existingSubscription?.unsubscribe();

  if (oldUserName) {
    await pushNotificationApi.deleteSubscriptionRecord(oldUserName);
  }

  // Get the server's public key
  const vapidPublicKey = (await pushNotificationApi.getVapidPublicKey()).data;

  const newSubscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: vapidPublicKey.publicKey,
  });

  await pushNotificationApi.registerPushSubscriptionRecord({
    userId,
    // conversion of type happens explicitly when parsed to json
    subscription: newSubscription as unknown as SubscriptionViewModel,
  });

  localStorage.setItem(localStorageUserIdKey, userId);
};

const getExistingPushSubscription = async (): Promise<
  | {
      userName: string;
      subscription: PushSubscription;
    }
  | undefined
> => {
  const registration = await navigator.serviceWorker.ready;

  // Use the PushManager to get the user's subscription to the push service.
  const subscription = await registration.pushManager.getSubscription();
  if (!subscription) return undefined;

  const userName = localStorage.getItem(localStorageUserIdKey);
  if (!userName) return undefined;

  return {
    subscription,
    userName,
  };
};
</script>
