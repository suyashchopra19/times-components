/* eslint-disable import/no-unresolved */

const React = require("react");
const { ApolloProvider } = require("react-apollo");
const { ArticleProvider } = require("@times-components/provider/rnw");
const Article = require("@times-components/article/rnw").default;

const platformAdConfig = {
  networkId: "25436805",
  adUnit: "d.thetimes.co.uk",
  sectionName: ""
};

const adConfig = {
  networkId: platformAdConfig.networkId,
  adUnit: platformAdConfig.adUnit,
  pageTargeting: {
    Timeline: "0",
    edition: "tnl-english",
    Shared: "0",
    testmode: platformAdConfig.testMode,
    cont_type: "art",
    av: platformAdConfig.appVersion,
    kw: [],
    st: "Member",
    aid: "",
    cos: platformAdConfig.operatingSystem,
    cov: platformAdConfig.operatingSystemVersion,
    cpn: platformAdConfig.cookieEid,
    did: platformAdConfig.deviceId,
    eid: platformAdConfig.cookieEid,
    env: platformAdConfig.environment,
    log: platformAdConfig.isLoggedIn ? "1" : "0",
    pid: platformAdConfig.cookieEid,
    vid: "",
    cips: platformAdConfig.cookieAcsTnl,
    path: platformAdConfig.sectionName.toLowerCase(),
    pform: platformAdConfig.platform,
    share_token: "",
    Timeline_Id: platformAdConfig.sectionName,
    iam_tgt: platformAdConfig.cookieIamTgt,
    section: platformAdConfig.sectionName,
    excl_cat: ""
  },
  slotTargeting: {
    path: `/${platformAdConfig.sectionName.toLowerCase()}`,
    section: platformAdConfig.sectionName,
    slot: platformAdConfig.sectionName.toLowerCase(),
    zone: "current_edition"
  },
  bidderSlots: [],
  biddersConfig: {
    bidders: {}
  }
};

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
      ({ article, isLoading, error }) =>
        React.createElement(Article, {
          adConfig,
          analyticsStream: () => {},
          article,
          isLoading,
          error,
          onAuthorPress: () => {},
          onRelatedArticlePress: () => {},
          onTopicPress: () => {}
        })
    )
  );
