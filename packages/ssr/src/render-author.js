const React = require("react");
const serverRenderer = require("./get-markup");
const AuthorProfileWithProvider = require("./author-profile");
const makeClient = require('./make-client-ac');

module.exports = {
  renderAuthorProfile: ({
    slug,
    currentPage,
    uri,
    perPage = 20,
    debounceTime = 0
  }) => {


    const props = {
      analyticsStream: () => {},
      client: makeClient({
        element: React.createElement(AuthorProfileWithProvider),
        name: "authorProfile",
        uri,
        useGET: true,
      }),
      debounceTimeMs: debounceTime,
      page: currentPage,
      pageSize: perPage,
      slug
  };

    const options = {
      element: React.createElement(AuthorProfileWithProvider, props),
      name: "authorProfile",
      uri,
      useGET: true,

    };

    // const client = makeClient(options);


    serverRenderer({
      ...options
    });
  }
};
