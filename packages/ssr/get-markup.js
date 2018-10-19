import createApp from "./create-app";
import getData from "./get-data";

module.exports = (options) => {

    const App = createApp(options);
    return getData(App);
}