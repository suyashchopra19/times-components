/* eslint-disable import/no-unresolved */

const React = require("react");
const { ApolloProvider } = require("react-apollo");
const { AuthorProfileProvider } = require("@times-components/provider");
const Context = require("@times-components/context").default;
const { scales } = require("@times-components/styleguide");
const AuthorProfile = require("@times-components/author-profile").default;
// const makeArticleUrl = require("./../make-url");
const makeArticleUrl = require("./make-url");

const scale = scales.large;
const sectionColour = "#FFFFFF";

module.exports = (client, slug, page) =>
  React.createElement(
    ApolloProvider,
    { client },
    React.createElement(
      AuthorProfileProvider,
      {
        debounceTimeMs: 0,
        slug
      },
      ({ author, isLoading, error, refetch }) =>
        React.createElement(
          Context.Provider,
          { value: { makeArticleUrl, theme: { scale, sectionColour } } },
          React.createElement(AuthorProfile, {
            adConfig: {},
            analyticsStream: () => {},
            author,
            error,
            isLoading,
            onArticlePress: () => {},
            onTwitterLinkPress: () => {},
            page,
            refetch,
            slug
          })
        )
    )
  );
