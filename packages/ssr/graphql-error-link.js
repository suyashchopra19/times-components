
const { onError } = require('apollo-link-error');


const errorLink = onError(({ networkError, graphQLErrors }) => {
    if (graphQLErrors) {
        graphQLErrors.map(({ message }) =>
            console.log(`[GraphQL error]: Message: ${message}`)
        );
    }
    if (networkError) {
        console.log(`[GraphQL Network error]: ${networkError}`);
    }
});

module.exports = errorLink;
