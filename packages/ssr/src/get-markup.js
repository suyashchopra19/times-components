const createApp = require("./create-app");
const getData = require("./get-data");

module.exports = options => {
  const App = createApp(options);
  return getData(App);
};
