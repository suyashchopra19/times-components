/* eslint-env browser */
const React = require('react');
const runClient = require("./run-client");
const createApp = require("./create-app");
const AuthorProfileWithProvider = require("./create-app");

const profileClient = (data) => runClient(createApp({
    element: React.createElement(AuthorProfileWithProvider, data),
    uri: window.nuk.graphqlapi.url,
    useGET: true,
    /* eslint no-underscore-dangle: ["error", { "allow": ["__APOLLO_STATE__"] }] */
    initialState: window.__APOLLO_STATE__
  }))