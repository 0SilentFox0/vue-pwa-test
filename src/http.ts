import {
  Configuration,
  PushNotificationEndpointsApi,
} from '@/generated/http-client';

const configuration = new Configuration({
  basePath: import.meta.env.PUBLIC_API_URL,
});

export const pushNotificationApi = new PushNotificationEndpointsApi(
  configuration,
);
