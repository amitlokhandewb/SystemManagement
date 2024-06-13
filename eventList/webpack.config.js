const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "SET",
    projectName: "eventList",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    devServer: {
      client: {
        overlay: {
          runtimeErrors: (error) => {
            if(error?.message === "ResizeObserver loop completed with undelivered notifications.")
            {
               console.error(error)
               return false;
            }
            return true;
          },
        },
      },
    },
    // modify the webpack config however you'd like to by adding to this object
  });
};
