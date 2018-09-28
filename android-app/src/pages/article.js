import React from "react";
import { NativeModules } from "react-native";
import { Article } from "@times-components/pages";
import adConfig from "../ad-config";
import articlePropTypes from "../article-prop-types";

const config = NativeModules.ReactConfig;
const { fetch } = NativeModules.NativeFetch;
const { track } = NativeModules.ReactAnalytics;
const {
  onArticlePress,
  onArticleLoaded,
  onAuthorPress,
  onCommentsPress,
  onCommentGuidelinesPress,
  onLinkPress,
  onTopicPress,
  onVideoPress
} = NativeModules.ArticleEvents;

const ArticlePageView = Article(config)(fetch);

const ArticleView = ({
  adTestMode,
  articleId,
  omitErrors,
  scale,
  sectionName
}) => {
  const platformAdConfig = {
    ...adConfig(config),
    sectionName,
    testMode: adTestMode
  };

  return (
    <ArticlePageView
      articleId={articleId}
      analyticsStream={event => {
        if (event.object === "Article" && event.action === "Viewed") {
          onArticleLoaded(event.attrs.articleId, event);
        } else {
          track(event);
        }
      }}
      omitErrors={omitErrors}
      onArticlePress={onArticlePress}
      onAuthorPress={onAuthorPress}
      onCommentsPress={onCommentsPress}
      onCommentGuidelinesPress={onCommentGuidelinesPress}
      onLinkPress={onLinkPress}
      onVideoPress={onVideoPress}
      onTopicPress={onTopicPress}
      platformAdConfig={platformAdConfig}
      scale={scale}
      sectionName={sectionName}
    />
  );
};

ArticleView.propTypes = articlePropTypes;

ArticleView.defaultProps = {
  adTestMode: ""
};

export default ArticleView;
