
const React = require('react');
const { ApolloProvider } = require('react-apollo');
const makeApolloClient = require('./make-client-ac');

module.exports = (options) => {

    const client = makeApolloClient(options);

    const App = React.createElement(
        ApolloProvider,
        { client },
        options.element
    );

    return App;
}