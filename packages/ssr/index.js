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
const bodyParser = require('body-parser');

const port = 3000;
const server = express();

server.use(bodyParser.json());

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
          <script src="https://smartlock.google.com/client"></script>
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

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('951483460818-ec6ve8477lnok1k912nb0arub0bht5hu.apps.googleusercontent.com');
async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '951483460818-ec6ve8477lnok1k912nb0arub0bht5hu.apps.googleusercontent.com',
  });
  const payload = ticket.getPayload();
  const userId = payload['sub'];

  console.log(payload);

  return userId;
  // If request specified a G Suite domain:
  //const domain = payload['hd'];
}

server.post("/authorize", async (req, res) => {
  const { token } = req.body;
  console.log(token);

  const userId = await verify(token).catch(console.error);
  console.log(userId);

  // Existing user
  if (userId === '106768301479716823288') {
    res.status(200).send({
      authToken: process.env.AUTH_TOKEN,
      newUser: false
    });
  } else {
    res.status(200).send({
      authToken: process.env.AUTH_TOKEN,
      newUser: true
    });
  } 
});

server.use(express.static("dist"));

server.listen(port, () => console.log(`Serving at http://localhost:${port}`));
