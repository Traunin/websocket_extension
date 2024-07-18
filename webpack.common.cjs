const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    popup: "./src/popup.ts",
    service_worker: "./src/service-worker.ts",
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },

  module: {
    rules: [
      {
        test: /\.(ts)$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css&/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },

  plugins: [
    new CopyPlugin({
      patterns: [{ from: "static" }],
    }),

    new MiniCssExtractPlugin({
      filename: "[name.css]",
    }),
  ],
};
