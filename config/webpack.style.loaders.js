const path = require("path"),
  MiniCSSExtract = require("mini-css-extract-plugin");

const DEVELOPMENT = process.env.NODE_ENV === "development";

const postcss = {
  loader: "postcss-loader",
  options: {
    postcssOptions: {
      sourceMap: DEVELOPMENT,
      plugins: [
        require("autoprefixer")({
          overrideBrowserslist: ["iOS > 7", "Android > 4", "Chrome > 31", "ff > 31"]
        })
      ],
    },
  }
};

const styles = [{
  test: /\.(scss|css)$/,
  use: ["style-loader", "css-loader", postcss, "sass-loader"],
  include: [path.join(__dirname, "../src")]
}];

if (!DEVELOPMENT) {
  styles.forEach(rule => rule.use.splice(0, 1, MiniCSSExtract.loader))
}

module.exports = styles;
