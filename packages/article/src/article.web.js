/* eslint-env browser */
import React, { Component } from "react";
import Ad, { AdComposer } from "@times-components/ad";
import RelatedArticles from "@times-components/related-articles";
import ArticleBody from "./article-body/article-body";
import ArticleHeader from "./article-header/article-header";
import ArticleLoading from "./article-loading";
import ArticleMeta from "./article-meta/article-meta";
import ArticleTopics from "./article-topics";
import LeadAssetComponent from "./article-lead-asset/article-lead-asset";
import getLeadAsset from "./article-lead-asset/get-lead-asset";
import articleTrackingContext from "./article-tracking-context";
import { articlePropTypes, articleDefaultProps } from "./article-prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import { WithStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import {
  MainContainer,
  HeaderContainer,
  MetaContainer,
  LeadAssetContainer,
  BodyContainer,
  HeaderAdContainer
} from "./styles/responsive";

const adStyle = {
  marginBottom: 0
};

const renderArticle = (
  articleData,
  analyticsStream,
  onAuthorPress,
  onRelatedArticlePress,
  onTopicPress
) => {
  const {
    hasVideo,
    headline,
    flags,
    standfirst,
    label,
    byline,
    publishedTime,
    publicationName,
    content,
    section,
    url,
    topics,
    relatedArticleSlice
  } = articleData;
  const leadAssetProps = getLeadAsset(articleData);
  const displayRelatedArticles = relatedArticleSlice ? (
    <RelatedArticles
      analyticsStream={analyticsStream}
      slice={relatedArticleSlice}
    />
  ) : null;

  return (
    <article>
      <HeaderAdContainer key="headerAd">
        <Ad
          contextUrl={url}
          section={section}
          slotName="header"
          style={adStyle}
        />
      </HeaderAdContainer>
      <MainContainer>
        <header>
          <HeaderContainer>
            <ArticleHeader
              flags={flags}
              hasVideo={hasVideo}
              headline={headline}
              label={label}
              standfirst={standfirst}
            />
          </HeaderContainer>
          <MetaContainer>
            <ArticleMeta
              byline={byline}
              onAuthorPress={onAuthorPress}
              publicationName={publicationName}
              publishedTime={publishedTime}
            />
            <ArticleTopics
              device="DESKTOP"
              onPress={onTopicPress}
              topics={topics}
            />
          </MetaContainer>
          <LeadAssetContainer>
            <LeadAssetComponent {...leadAssetProps} />
          </LeadAssetContainer>
        </header>
        <BodyContainer>
          <ArticleBody content={content} contextUrl={url} section={section} />
        </BodyContainer>
      </MainContainer>
      <ArticleTopics onPress={onTopicPress} topics={topics} />
      <aside>{displayRelatedArticles}</aside>
      <Ad contextUrl={url} section={section} slotName="pixel" />
      <Ad contextUrl={url} section={section} slotName="pixelteads" />
      <Ad contextUrl={url} section={section} slotName="pixelskin" />
    </article>
  );
};

const action = (
  <Button color="secondary" size="small">
    Read this one now
  </Button>);

class ArticlePage extends Component {
  constructor(props) {
    super(props);

    this.state = {showRA: false};

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const options = {
      rootMargin: "10px",
      threshold: 0.5
    };
    this.showingLogin = false;

    this.observer = new window.IntersectionObserver(
      this.handleObservation.bind(this),
      options
    );
  }

  handleObservation(entries) {
    entries.forEach(({ target, intersectionRatio }) => {
      if (intersectionRatio >= 0.5 && !this.showingLogin) {
        this.showingLogin = true;
        const hintPromise = googleyolo.hint({
          supportedAuthMethods: [
            "https://accounts.google.com"
          ],
          supportedIdTokenProviders: [
            {
              uri: "https://accounts.google.com",
              clientId: "951483460818-ec6ve8477lnok1k912nb0arub0bht5hu.apps.googleusercontent.com"
            }
          ]
        });

        hintPromise.then((credential) => {
          if (credential.idToken) {
            // Send the token to your auth backend.
            fetch("/authorize", {
              method: "POST",
              headers: {
                "Content-Type": "application/json; charset=utf-8",
              },
              body: JSON.stringify({token: credential.idToken}),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                window.localStorage.setItem("authToken", data.authToken);
                if (data.newUser) {
                  this.setState({showRA: true});
                } else {
                  this.props.refetch();
                }
              })
            .catch(error => console.error(error));
          }
        }, (error) => {
          switch (error.type) {
            case "userCanceled":
              // The user closed the hint selector. Depending on the desired UX,
              // request manual sign up or do nothing.
              break;
            case "noCredentialsAvailable":
              // No hint available for the session. Depending on the desired UX,
              // request manual sign up or do nothing.
              break;
            case "requestFailed":
              // The request failed, most likely because of a timeout.
              // You can retry another time if necessary.
              break;
            case "operationCanceled":
              // The operation was programmatically canceled, do nothing.
              break;
            case "illegalConcurrentRequest":
              // Another operation is pending, this one was aborted.
              break;
            case "initializationError":
              // Failed to initialize. Refer to error.message for debugging.
              break;
            case "configurationError":
              // Configuration error. Refer to error.message for debugging.
              break;
            default:
              // Unknown error, do nothing.
          }
        });
      }
    });
  }

  componentDidMount() {
    this.observer.observe(document.getElementById("ArticleTopics"));
    console.log(document.getElementById("ArticleTopics"));

    window.onGoogleYoloLoad = googleyolo => {
      this.googleYolo = googleyolo;
    };
  }

  render() {
    const {
      adConfig,
      analyticsStream,
      article,
      error,
      isLoading,
      onAuthorPress,
      onRelatedArticlePress,
      onTopicPress
    } = this.props;

    if (error) {
      return null;
    }

    if (isLoading) {
      return <ArticleLoading />;
    }

    return (
      <AdComposer adConfig={adConfig}>
        <React.Fragment>
          {renderArticle(
            article,
            analyticsStream,
            onAuthorPress,
            onRelatedArticlePress,
            onTopicPress
          )}
          <Snackbar
            message={(
              <React.Fragment>
                <h1>Account Created</h1>
                <p>You're now Registered Access and you have 3 free articles left</p>
              </React.Fragment>
            )}
            action={action}
            open={this.state.showRA}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
           />
        </React.Fragment>
      </AdComposer>
    );
  }
}

ArticlePage.propTypes = articlePropTypes;
ArticlePage.defaultProps = articleDefaultProps;

export default articleTrackingContext(ArticlePage);
