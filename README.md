# Bright Birds POC

## Functionality

### QR-codes

The application supports scanning QR codes within the app. To simulate reality, a 'button' is used to open the scanning functionality, leading to a separate page. An overlay was not chosen because there are accounts suggesting that camera permissions can be granted on a per-page basis, and the goal is to minimize the number of permission actions required.

After scanning the QR code, the result is sent to a separate 'landing page' (QR-results). This is intentionally done so that this landing page can also be used for deep linking and capturing external QR codes. The purpose of this page is to capture the QR data and then forward it to the API, which then provides instructions on the necessary actions. Is the action correct or not, and should it then redirect to the appropriate location? Ultimately, the redirection can be made from this location, and the user can be informed.

Findings:

- Within iOS, permission to use the camera is frequently requested. This permission is now combined with the scanning button to avoid continuous clicking and ensure a more natural process. The permission is remembered per session, which may be quite brief. Android does not have these issues.

### Deeplinking

Ideally, by scanning a QR code using a camera, the app should open and continue its process within it. Android supports this; the PWA opens as a result. By using a query string, the information can then be captured on the QR-results page and processed further.

iOS does not support this. On this page, there will be instructions indicating that the in-app scanner must be used.
Also, using the notification api to send a pushmessage to open in the pwa doesn't work, since push notifications are only supported when a PWA is already added on the homescreen.

# hello-world

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
