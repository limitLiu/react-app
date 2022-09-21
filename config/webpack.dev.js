const path = require("path"),
  { merge } = require("webpack-merge"),
  base = require("./webpack.base"),
  HTMLWebpack = require("html-webpack-plugin");

module.exports = merge(base, {
  devtool: "eval-cheap-module-source-map",
  mode: "development",
  devServer: {
    port: "3000",
    host: "localhost",
    proxy: {
      "/api": "",
    },
    static: {
      directory: path.join(__dirname, "../public")
    },
    compress: true,
    historyApiFallback: true,
    hot: true,
    https: false,
  },
  plugins: [
    new HTMLWebpack({
      title: "Learn React",
      filename: "index.html",
      template: "../src/index.html"
    }),
  ]
});
