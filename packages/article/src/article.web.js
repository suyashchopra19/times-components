import React, { Fragment } from "react";
import RelatedArticles from "@times-components/related-articles";
import ArticleBody from "./article-body/article-body";
import ArticleTopics from "./article-topics";
import { articlePropTypes, articleDefaultProps } from "./article-prop-types";

import {
  BodyContainer,
} from "./styles/responsive";

const Article = (props) => {
    const {
      analyticsStream,
      data: {
        content,
        section,
        url,
        topics,
        relatedArticleSlice
      },
      observed,
      registerNode
    } = props;

    // eslint-disable-next-line react/prop-types
    const displayRelatedArticles = ({ isVisible }) =>
      relatedArticleSlice ? (
        <RelatedArticles
          analyticsStream={analyticsStream}
          isVisible={isVisible}
          slice={{
            ...relatedArticleSlice,
            sliceName: relatedArticleSlice.__typename // eslint-disable-line no-underscore-dangle
          }}
        />
      ) : null;

    return (
      <Fragment>
      <BodyContainer>
        <ArticleBody
          content={content}
          contextUrl={url}
          observed={observed}
          registerNode={registerNode}
          section={section}
        />
      </BodyContainer>
      <ArticleTopics topics={topics} />
      <aside id="related-articles" ref={node => registerNode(node)}>
        {displayRelatedArticles({
          isVisible: !!observed.get("related-articles")
        })}
      </aside>
      </Fragment>
    );
};

Article.propTypes = articlePropTypes;
Article.defaultProps = articleDefaultProps;

export default Article;
