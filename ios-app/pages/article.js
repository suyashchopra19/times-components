import React from "react";
import PropTypes from "prop-types";
import { NativeModules } from "react-native";
import { Article } from "@times-components/pages";

const config = NativeModules.NativeModuleReactConfig;
const { fetch } = NativeModules.NativeModuleFetch;
const { track } = NativeModules.NativeModuleAnalytics;

const {
  onRelatedArticlePress: onArticlePress,
  onArticleLoaded,
  onLinkPress,
  onAuthorPress,
  onVideoPress,
  onTopicPress,
  onCommentsPress,
  onCommentGuidelinesPress
} = NativeModules.NativeModuleArticleActions;

const platformAdConfig = {
  adUnit: config.adUnit,
  networkId: config.adNetworkId,
  appVersion: config.appVersion,
  operatingSystem: "IOS",
  operatingSystemVersion: config.operatingSystemVersion,
  environment: config.environment,
  deviceId: config.deviceId,
  cookieEid: config.cookieEid,
  cookieAcsTnl: config.cookieAcsTnl,
  cookieIamTgt: config.cookieIamTgt,
  isLoggedIn: config.isLoggedIn,
  platform: "mobile"
};

const ArticlePageView = Article(config)(fetch);

const ArticleView = ({ 
  adTestMode,
  articleId,
  omitErrors,
  scale,
  sectionName
}) => {
  const adConfig = { ...platformAdConfig, sectionName, testMode: adTestMode };

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
      platformAdConfig={adConfig}
      scale={scale}
      sectionName={sectionName}
    />
  );
};

ArticleView.propTypes = {
  adTestMode: PropTypes.string,
  articleId: PropTypes.string.isRequired,
  omitErrors: PropTypes.bool.isRequired,
  scale: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired
};

ArticleView.defaultProps = {
  adTestMode: ""
};

export default ArticleView;
