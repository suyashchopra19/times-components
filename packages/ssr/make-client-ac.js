/* eslint-env browser */
/* eslint-disable no-underscore-dangle */

const { InMemoryCache: Cache } = require("apollo-cache-inmemory");
const { ApolloClient } = require("apollo-client");
const { setContext } = require('apollo-link-context');
const { createHttpLink } = require("apollo-link-http");
const { fragmentMatcher } = require("@times-components/schema");
const fetch = require("node-fetch");

const httpLink = createHttpLink({
  fetch,
  uri: process.env.GRAPHQL_ENDPOINT
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const authToken = localStorage.getItem('authToken');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: authToken ? `Bearer ${authToken}` : "",
    }
  }
});

module.exports = () =>
  new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new Cache({ addTypename: true, fragmentMatcher }).restore(
      window.__APOLLO_STATE__
    )
  });
