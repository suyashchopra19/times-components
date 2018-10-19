/* eslint-env browser */
/* eslint-disable no-underscore-dangle */

const { fragmentMatcher } = require("@times-components/schema");
const { ApolloClient } = require("apollo-client");
const { ApolloLink } = require("apollo-link");
const { createHttpLink } = require("apollo-link-http");
const { InMemoryCache } = require("apollo-cache-inmemory");
const fetch = require("node-fetch");

const errorLink = require("./graphql-error-link");
const LoggingLink = require("./graphql-logging-link");

module.exports = options => {
  if (!options.name || !options.element) {
    throw new Error("Provider module is missing.");
  }
  if (!options.uri) {
    throw new Error("GraphQL API URI is missing.");
  }

  const graphqlUri = options.uri;
  const networkInterfaceOptions = {
    fetch,
    headers: {},
    uri: graphqlUri
  };

  if (options.headers) {
    Object.assign(networkInterfaceOptions.headers, options.headers);
  }

  if (options.useGET) {
    networkInterfaceOptions.headers["content-type"] =
      "application/x-www-form-urlencoded";
    networkInterfaceOptions.useGETForQueries = true;
  }
  const httpLink = createHttpLink(networkInterfaceOptions);

  const link = ApolloLink.from([
    new LoggingLink(graphqlUri),
    errorLink,
    httpLink
  ]);

  const client = new ApolloClient({
    cache: new InMemoryCache({ fragmentMatcher }),
    link,
    ssrMode: true
  });

  return client;
};
