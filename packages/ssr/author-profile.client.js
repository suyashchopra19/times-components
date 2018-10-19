/* eslint-env browser */
const React = require('react');
const runClient = require("./run-client");
const createApp = require("./create-app");
const AuthorProfileWithProvider = require("./create-app");

module.exports = (data) => runClient(createApp({
    element: React.createElement(AuthorProfileWithProvider, data),
    initialState: window.__APOLLO_STATE__,
    uri: window.nuk.graphqlapi.url,
    /* eslint no-underscore-dangle: ["error", { "allow": ["__APOLLO_STATE__"] }] */
    useGET: true
  }))