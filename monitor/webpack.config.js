const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "SET",
    projectName: "monitor",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
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
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            'style-loader', // Injects styles into DOM
            'css-loader',   // Translates CSS into CommonJS
            'sass-loader'   // Compiles Sass to CSS
          ],
        },
      ],
    },

  });
};
