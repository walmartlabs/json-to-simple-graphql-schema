const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./web-ui/index.js",
  mode: "development",
  devtool: 'inline-source-map',
  devServer: {
    static: './docs',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, "docs"),
    clean: true,
  },
  resolve: {
    fallback: {
      util: require.resolve("util/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_DEBUG": "false",
      "process.env.DEBUG": "false",
    }),
    new HtmlWebpackPlugin({
      title: "JSON to GraphQL schema generators",
      template: "web-ui/index.html"
    }),
  ],
};
