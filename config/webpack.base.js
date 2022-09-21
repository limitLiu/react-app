const path = require("path"),
  CopyPlugin = require("copy-webpack-plugin"),
  MiniCSSExtract = require("mini-css-extract-plugin"),
  webpack = require('webpack'),
  styles = require("./webpack.style.loaders");

const resolve = dir => path.resolve(process.cwd(), dir);
const variable = process.env.NODE_ENV;

const configEnv = {
  dev: "development",
  build: "production",
};

const PRODUCTION = configEnv[variable] === "production";

module.exports = {
  entry: {
    app: resolve("src/index.js")
  },
  output: {
    path: resolve("public"),
    publicPath: "/",
    sourceMapFilename: "[name].map",
    chunkFilename: "static/js/[name].[fullhash].js",
    filename: "static/js/[name].[fullhash].js"
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            ["@babel/preset-env", {
              targets: { ie: 11, },
              ignoreBrowserslistConfig: true,
              useBuiltIns: false,
              modules: false,
              exclude: ["transform-typeof-symbol"],
            }],
            ["@babel/preset-react", {
              "targets": "last 2 versions, ie 11", "modules": false
            }],
            "@babel/preset-flow"
          ],
          plugins: [
            [
              "@babel/plugin-transform-runtime",
              {
                "corejs": false,
                "helpers": true,
                "regenerator": true,
                "useESModules": false
              }
            ],
            ["@babel/plugin-syntax-dynamic-import"],
            ["@babel/plugin-proposal-decorators", { legacy: true }],
          ]
        }
      },
      ...styles,
      {
        test: /\.(eot|woff|woff2|ttf)(\?\S*)?$/,
        loader: "url-loader",
        options: {
          name: "assets/fonts/[name].[fullhash].[ext]",
          limit: 2048,
        }
      },
      {
        test: /\.(svg|png|jpe?g|gif)(\?\S*)?$/,
        loader: "url-loader",
        options: {
          name: "assets/images/[name].[hash].[ext]",
          limit: 2014,
        }
      }
    ]
  },
  context: __dirname,
  target: "web",
  stats: "errors-only",
  optimization: {
    minimize: PRODUCTION,
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      name: false,
      cacheGroups: {
        // react: {
        //   name: "vendor",
        //   test: /[\\/]node_modules\/(react|redux)[\\/]/,
        //   priority: 1,
        //   chunks: "all",
        // },
        default: {
          name: "common",
          minChunks: 2,
          chunks: "all",
          priority: -10,
          reuseExistingChunk: true
        },
      }
    }
  },
  resolve: {
    alias: {
      react: resolve("src/3rd-party/react/packages/react"),
      "react-dom": resolve("src/3rd-party/react/packages/react-dom"),
      shared: resolve("src/3rd-party/react/packages/shared"),
      "react-reconciler": resolve("src/3rd-party/react/packages/react-reconciler"),
      scheduler: resolve("src/3rd-party/react/packages/scheduler")
    }
  },
  plugins: [
    new MiniCSSExtract({
      filename: "static/css/[name].[fullhash].css",
    }),
    new CopyPlugin({
      patterns: [
        { from: resolve("favicon") },
      ],
    }),
    new webpack.DefinePlugin({
      __DEV__: !PRODUCTION,
      __EXPERIMENTAL__: !PRODUCTION,
      __PROFILE__: !PRODUCTION,
      __UMD__: !PRODUCTION,
    }),
  ]
};
