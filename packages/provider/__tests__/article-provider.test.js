import React from "react";
import renderer from "react-test-renderer";
import {
  article as makeParams,
  MockedProvider,
  schemaToMocks
} from "@times-components/provider-test-tools";
import { ArticleProvider } from "../src/provider";

const renderComponent = (mocks, id, child) =>
  renderer.create(
    <MockedProvider mocks={mocks}>
      <ArticleProvider debounceTimeMs={0} id={id}>
        {child}
      </ArticleProvider>
    </MockedProvider>
  );

describe("ArticleProvider", () => {
  it("returns query result", done => {
    const id = "113e9875-b7bf-4dd7-ac99-dee231bf6e74";

    schemaToMocks(
      makeParams({
        makeArticle: article => ({
          ...article,
          content: [
            {
              children: [
                {
                  attributes: {
                    value: "test"
                  },
                  name: "text"
                }
              ],
              name: "paragraph"
            }
          ],
          relatedArticleSlice: {
            __typename: "StandardSlice",
            items: [
              {
                article: {
                  byline: [
                    {
                      attributes: {},
                      children: [
                        {
                          attributes: {
                            value: "Patrick Kidd"
                          },
                          children: [],
                          name: "text"
                        }
                      ],
                      name: "inline"
                    }
                  ],
                  hasVideo: true,
                  headline:
                    "TMS: Pratchett’s law of the jungle - Disable Saving",
                  id: "ea16d744-cb4a-11e4-a202-50ac5def393a",
                  label: "Health",
                  leadAsset: {
                    __typename: "Image",
                    crop32: {
                      url:
                        "//nu-cps-imgsrv-tnl-dev-webapp.elb.tnl-dev.ntch.co.uk/imageserver/image/9a9cf7c4b313584c4b1a231ffea56ad3154cc520.jpg?crop=780%2C520%2C0%2C0"
                    },
                    crop169: {
                      url:
                        "//nu-cps-imgsrv-tnl-dev-webapp.elb.tnl-dev.ntch.co.uk/imageserver/image/9a9cf7c4b313584c4b1a231ffea56ad3154cc520.jpg?crop=780%2C439%2C0%2C40"
                    },
                    id: "6c1c108e-ed63-47af-df1d-46c63be16627",
                    title: "TMS: Pratchett’s law of the jungle"
                  },
                  publicationName: "TIMES",
                  publishedTime: "2015-03-23T19:39:39.000Z",
                  section: "sport",
                  shortHeadline: "TMS: Pratchett’s law of the jungle",
                  slug: "related-article-slug",
                  summary125: [
                    {
                      attributes: {},
                      children: [
                        {
                          attributes: {
                            value:
                              "Terry Pratchett, who died last week, began his career on the "
                          },
                          children: [],
                          name: "text"
                        },
                        {
                          attributes: {},
                          children: [
                            {
                              attributes: {
                                value: "Bucks Free Press"
                              },
                              children: [],
                              name: "text"
                            }
                          ],
                          name: "italic"
                        },
                        {
                          attributes: {
                            value:
                              " in 1965, aged 17, and the paper recalls in a"
                          },
                          children: [],
                          name: "text"
                        }
                      ],
                      name: "paragraph"
                    }
                  ],
                  url:
                    "http://cps-render-ci.elb.tnl-dev.ntch.co.uk/article/tms-pratchetts-law-of-the-jungle-xgqrcw779"
                }
              }
            ]
          }
        }),
        relatedArticleCount: 1,
        variables: () => ({
          id
        })
      })
    ).then(mocks =>
      renderComponent(mocks, id, ({ article, isLoading }) => {
        if (!isLoading) {
          expect(article).toMatchSnapshot();
          done();
        }

        return null;
      })
    );
  });
});
