import {
  addSerializers,
  enzymeTreeSerializer,
  compose,
  minimaliseTransform,
  minimalWebTransform,
  print
} from "@times-components/jest-serializer";
import "./mocks.web";
import shared from "./images.base";

jest.mock("../src/article-comments/article-comments", () => "ArticleComments");

const omitProps = new Set([
  "className",
  "data-testid",
  "responsiveLinkStyles",
  "style"
]);

export default () => {
  addSerializers(
    expect,
    enzymeTreeSerializer(),
    compose(
      print,
      minimalWebTransform,
      minimaliseTransform((value, key) => omitProps.has(key))
    )
  );

  shared();
};
