import React from "react";
import PropTypes from "prop-types";
import { NativeModules } from "react-native";
import { SimpleArticle } from "@times-components/pages";

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
const SimpleArticlePageView = SimpleArticle(config)(fetch);

const platformAdConfig = {
  adUnit: "thetimes.mob.android",
  networkId: config.adNetworkId,
  operatingSystem: "Android",
  operatingSystemVersion: config.operatingSystemVersion,
  deviceId: config.deviceId,
  cookieEid: config.cookieEid,
  isLoggedIn: config.isLoggedIn,
  platform: "mobile"
};

const ArticleView = ({
  adTestMode,
  article,
  articleId,
  omitErrors,
  scale,
  sectionName
}) => {
  const adConfig = { ...platformAdConfig, sectionName, testMode: adTestMode };

  return (
    <SimpleArticlePageView
      articleId={articleId}
      article={JSON.parse(article).data.article}
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
      platformAdConfig={adConfig}
      scale={scale}
      sectionName={sectionName}
    />
  );
};

ArticleView.propTypes = {
  adTestMode: PropTypes.string,
  article: PropTypes.shape({}).isRequired,
  articleId: PropTypes.string.isRequired,
  omitErrors: PropTypes.bool.isRequired,
  scale: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired
};

ArticleView.defaultProps = {
  adTestMode: ""
};

export default ArticleView;
