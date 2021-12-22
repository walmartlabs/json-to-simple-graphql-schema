const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./web-ui/index.js",
  mode: "production",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "docs"),
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
  ],
};
