const createApp = require("./create-app");
const getData = require("./get-data");

module.exports = options => {
  console.log('option  in markup is', options);
  const App = createApp(options);
  return getData(App);
};
