// copy and pasted from mozilla.
// (https://github.com/mdn/serviceworker-cookbook/blob/master/server.js and
// https://github.com/mdn/serviceworker-cookbook/blob/master/push-payload/server.js)

// Use the web-push library to hide the implementation details of the communication
// between the application server and the push service.
// For details, see https://tools.ietf.org/html/draft-ietf-webpush-protocol and
// https://tools.ietf.org/html/draft-ietf-webpush-encryption.
const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3003;

// VAPID keys are used by a push service to validate
// that a message has been sent by an authorised server.
const vapid = {
  publicKey:
    process.env.VAPID_PUBLIC_KEY ??
    'BChl9v1kvfqFzawV2RiIkmko3bi9RD1kUErdA3T7Um8SJoNiG0ECz44XeKWdF8gf50rqXqPD-CaDotDkQTSNyjE',
  privateKey:
    process.env.VAPID_PRIVATE_KEY ??
    'J1j1IbI375fS2P7pwAotmtCL-efjkib59scPyX0Qntk',
};

// Set the keys used for encrypting the push messages.
webPush.setVapidDetails('https://localhost', vapid.publicKey, vapid.privateKey);

const app = express();

app.use(bodyParser.json());

app.use(function corsify(req, res, next) {
  // http://enable-cors.org/server_expressjs.html
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
  next();
});

const route = '/';
app.get(route + 'vapidPublicKey', function (req, res) {
  res.send(vapid.publicKey);
});

app.post(route + 'register', function (req, res) {
  // A real world application would store the subscription info.
  res.sendStatus(201);
});

app.post(route + 'sendNotification', function (req, res) {
  const subscription = req.body.subscription;
  const payload = req.body.payload;

  setTimeout(function () {
    webPush
      .sendNotification(subscription, payload)
      .then(function () {
        res.sendStatus(201);
      })
      .catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
  }, req.body.delay);
});

var ready = new Promise(function willListen(resolve, reject) {
  app.listen(port, function didListen(err) {
    if (err) {
      reject(err);
      return;
    }
    console.log('app.listen on http://localhost:%d', port);
    resolve();
  });
});

exports.ready = ready;
exports.app = app;
