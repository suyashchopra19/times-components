/* eslint-disable no-console */

const express = require("express");
const { ApolloClient } = require("apollo-client");
const { InMemoryCache: Cache } = require("apollo-cache-inmemory");
const { fragmentMatcher } = require("@times-components/schema");
const fetch = require("node-fetch");
const { createHttpLink } = require("apollo-link-http");
const getData = require("./get-data");
const article = require("./article");
const authorProfile = require("./author-profile");
const topic = require("./topic");
const request = require("request");
// const firebase = require("firebase-admin");

// firebase.initializeApp({
//   messagingSenderId: "56468674053"
// });

const port = 3000;
const server = express();

const makeClient = () =>
  new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      fetch,
      uri: process.env.GRAPHQL_ENDPOINT
    }),
    cache: new Cache({ addTypename: true, fragmentMatcher })
  });

const makeHtml = (
  client,
  identifier,
  page,
  { bundleName, html, rnwStyles, scStyles, title }
) => `
        <!DOCTYPE html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>${title}</title>
            ${rnwStyles}
            ${scStyles}
            <script>
            window.nuk = { identifier: "${identifier}", page: ${page} };
            window.__APOLLO_STATE__=${JSON.stringify(client.extract()).replace(
              /</g,
              "\\\u003c"
            )};
            </script>
          </head>
          <body style="margin:0">
            <div id="app">${html}</div>
          </body>
          <script src="/vendor.bundle.js"></script>
          <script src="/${bundleName}.bundle.js"></script>
          <script src="https://www.gstatic.com/firebasejs/5.5.0/firebase.js"></script>
          <script src="/firebase-messaging-sw.js"></script>
          <script>
            // Initialize Firebase
            var config = {
              apiKey: "AIzaSyAd5erE9Vgt0vPyQs8P9Yve8lxp_jU9BoQ",
              authDomain: "hackathon-c5714.firebaseapp.com",
              databaseURL: "https://hackathon-c5714.firebaseio.com",
              projectId: "hackathon-c5714",
              storageBucket: "hackathon-c5714.appspot.com",
              messagingSenderId: "56468674053"
            };

            window.subscribeNotification = function() {
              firebase.initializeApp(config);

              navigator.serviceWorker
              .register('/firebase-messaging-sw.js')
              .then((registration) => {
                firebase.messaging().useServiceWorker(registration);
              });

              const messaging = firebase.messaging();
              messaging
                  .requestPermission()
                  .then(() => {
                    console.log("Have Permission");
                    return messaging.getToken();
                  })
                  .then(token => {
                    console.log("FCM Token:", token);
                    console.log(JSON.stringify({token}))
                    fetch("/push-notification/" + token);
                    //you probably want to send your new found FCM token to the
                    //application server so that they can send any push
                    //notification to you.
                  })
                  .catch(error => {
                    if (error.code === "messaging/permission-blocked") {
                        console.log("Please Unblock Notification Request Manually");
                    } else {
                        console.log("Error Occurred", error);
                    }
                    });
            }

          </script>
        </html>
      `;

const toNumber = s => {
  const parsed = Number.parseInt(s, 10);

  if (Number.isNaN(parsed)) {
    return null;
  }

  return parsed;
};

server.get("/article/:id", (req, res) => {
  const { params: { id } } = req;
  const client = makeClient();
  const App = article(client, id);

  getData(App).then(props =>
    res.send(
      makeHtml(client, id, null, {
        ...props,
        bundleName: "article",
        title: "Article"
      })
    )
  );
});

server.get("/profile/:slug", (req, res) => {
  const { params: { slug }, query: { page } } = req;
  const pageNum = toNumber(page) || 1;
  const client = makeClient();
  const App = authorProfile(client, slug, pageNum);

  getData(App).then(props =>
    res.send(
      makeHtml(client, slug, pageNum, {
        ...props,
        bundleName: "author-profile",
        title: slug
      })
    )
  );
});

server.get("/topic/:slug", (req, res) => {
  const { params: { slug }, query: { page } } = req;
  const pageNum = toNumber(page) || 1;
  const client = makeClient();
  const App = topic(client, slug, pageNum);

  getData(App).then(props =>
    res.send(
      makeHtml(client, slug, pageNum, {
        ...props,
        bundleName: "topic",
        title: slug
      })
    )
  );
});

server.get("/push-notification/:token", (req, res) => {
  const{ params: { token }} = req;
  global.james = token;
  console.log(token)
});

server.get("/push-notification-send", (req, res) => {
  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "key=AAAADSXLlgU:APA91bFdYony5xU4ovErO_HAHg-2w9HxB0L8jZ3haoTqg7YftoRX4-xFW5XfrdOeots5W9MZM7QdTCNefK6S7iWYNkQMwYMXIE7wiBCbFOEO3VqOpiPsW0gVioP2biNvMTA4Q8e1TqP2"
    },
    body: {
      notification: {
        title: "Britain set for tough new curbs on low‑skilled immigrants",
        body: "Theresa May’s plans for a tough new immigration regime were given a boost yesterday after a key report called for an end to low-skilled migration from the EU after Brexit.",
        click_action: "https://www.thetimes.co.uk/article/no-need-for-low-skilled-workers-after-brexit-says-migration-report-jhvsj87b2",
        icon: "http://localhost:3000/images/times-192.png"
      },
      to: global.james
    },
    json: true
  }

  request('https://fcm.googleapis.com/fcm/send', options, (err, response, body) => {
    console.log(options)
    if(err){ res.send({"error": err})}
    res.send(body);
  });

})

server.use(express.static("dist"));
server.use(express.static("public"));

server.listen(port, () => console.log(`Serving at http://localhost:${port}`));
