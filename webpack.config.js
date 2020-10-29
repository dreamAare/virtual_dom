// var webpack = require("webpack");
var path = require("path");
module.exports = {
  devServer: {
    port: 7777,
    hot: true,
    open: false,
  },
  entry: {
    app: "./src/index.js",
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/assets/",
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, use: "babel-loader" }],
  },
};
