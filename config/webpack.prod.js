"use strict";

const path = require("path"),
  webpack = require("webpack"),
  base = require("./webpack.base"),
  { merge } = require("webpack-merge"),
  HTMLWebpack = require("html-webpack-plugin"),
  UglifyJs = require("terser-webpack-plugin"),
  { CleanWebpackPlugin } = require("clean-webpack-plugin"),
  CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const configEnv = {
  dev: "development",
  build: "production",
};

const PRODUCTION = configEnv[process.env.NODE_ENV] === "production";

module.exports = merge(base, {
  mode: "production",
  devtool: false,
  optimization: {
    minimizer: [
      new UglifyJs({
        parallel: true
      }),
      new CssMinimizerPlugin
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CssMinimizerPlugin(),
    new HTMLWebpack({
      title: "Learn React",
      filename: "index.html",
      template: path.resolve(__dirname, "../src/index.html"),
      inject: true,
      minify: {
        minifyJS: true,
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
    })
  ],
});
