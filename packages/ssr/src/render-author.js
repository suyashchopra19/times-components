const React = require("react");
const serverRenderer = require("./get-markup");
const { AuthorProfileWithProvider } = require("./author-profile");

module.exports = {
  renderAuthorProfile: ({
    slug,
    currentPage,
    uri,
    perPage = 20,
    debounceTime = 0
  }) => {
    serverRenderer.getMarkup({
      element: React.createElement(AuthorProfileWithProvider, {
        analyticsStream: () => {},
        debounceTimeMs: debounceTime,
        page: currentPage,
        pageSize: perPage,
        slug
      }),
      name: "authorProfile",
      uri,
      useGET: true
    });
  }
};
