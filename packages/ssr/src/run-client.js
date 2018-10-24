/* eslint-env browser */

const { AppRegistry } = require("react-native");

module.exports = App => {
  console.log('IN run-client, client side');
  AppRegistry.registerComponent("App", () => () => App);

  AppRegistry.runApplication("App", {
    rootTag: document.getElementById("app")
  });
};
