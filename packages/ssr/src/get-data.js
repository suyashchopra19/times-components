const ReactDOMServer = require("react-dom/server");
const { AppRegistry } = require("react-native-web");
const { getDataFromTree } = require("react-apollo");
const { ServerStyleSheet } = require("styled-components");

module.exports = App =>
  getDataFromTree(App).then(() => {
    AppRegistry.registerComponent("App", () => () => App);

    const { element, getStyleElement } = AppRegistry.getApplication("App");
    console.log('IN get-data, element', element);
    console.log('IN get-data, getStyleElement', getStyleElement);
    const serverStylesheet = new ServerStyleSheet();

    const markup = ReactDOMServer.renderToString(
      serverStylesheet.collectStyles(element)
    );

    const extraStyles = serverStylesheet.getStyleTags();

    const styles = ReactDOMServer.renderToStaticMarkup(getStyleElement());

    console.log('IN get-data, html', markup);
    console.log('IN get-data, rnwStyles', styles);
    console.log('IN get-data, extraStyles', extraStyles);

    // const initialProps = `<script>window.nuk['${
    //     options.name
    //   }'] = ${props};</script>`;
    // const initialState = `<script>window.__APOLLO_STATE__ = ${state};</script>`;


    return { extraStyles, markup, styles };
  });
