const React = require("react");
const { ApolloProvider } = require("react-apollo");
const makeApolloClient = require("./make-client-ac");

module.exports = options => {
  const client = makeApolloClient(options);

  console.log('options are', options);

  const App = React.createElement(ApolloProvider, { client }, options.element);
  console.log('create app', App);
;  return App;
};
