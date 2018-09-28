import { AppRegistry } from "react-native";
import { URL, URLSearchParams } from "url-polyfill";
import AuthorProfileView from "./src/pages/author-profile";
import ArticleView from "./src/pages/article";
import ArticleWithNativeProvider from "./src/pages/article-with-native-provider";
import TopicView from "./src/pages/topic";

// see https://github.com/facebook/react-native/issues/16434
global.URL = URL;
global.URLSearchParams = URLSearchParams;

AppRegistry.registerComponent("AuthorProfile", () => AuthorProfileView);
AppRegistry.registerComponent("Article", () => ArticleView);
AppRegistry.registerComponent(
  "ArticleWithNativeProvider",
  () => ArticleWithNativeProvider
);
AppRegistry.registerComponent("Topic", () => TopicView);
