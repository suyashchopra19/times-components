/* eslint-disable import/no-unresolved */

const React = require("react");
const { ApolloProvider } = require("react-apollo");
const { ArticleProvider } = require("@times-components/provider");
const Article = require("@times-components/article").default;
const Context = require("@times-components/context").default;
const { scales } = require("@times-components/styleguide");
const makeArticleUrl = require("./../make-url");
const adConfig = require("./../ad-config.json");

const scale = scales.large;
const sectionColour = "#FFFFFF";

module.exports = (client, id) =>
  React.createElement(
    ApolloProvider,
    { client },
    React.createElement(
      ArticleProvider,
      {
        debounceTimeMs: 0,
        id
      },
      ({ article, isLoading, error, refetch }) =>
        React.createElement(
          Context.Provider,
          { value: { makeArticleUrl, theme: { scale, sectionColour } } },
          React.createElement(Article, {
            adConfig,
            analyticsStream: () => {},
            article,
            error,
            isLoading,
            onAuthorPress: () => {},
            onRelatedArticlePress: () => {},
            onTopicPress: () => {},
            refetch
          })
        )
    )
  );
