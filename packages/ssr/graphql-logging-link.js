

const { ApolloLink } = require('apollo-link');
// const logger = require('../logger');

class LogLink extends ApolloLink {
    constructor(uri) {
        super();
        this.uri = uri;
    }
    request(operation, forward) {
        console.log(`Connecting to GraphQL at ${this.uri} for ${operation.operationName}`);
        return forward(operation).map(data => {
            console.log(`Ending GraphQL request for ${operation.operationName}`);
            return data;
        });
    }
}

module.exports = LogLink;
