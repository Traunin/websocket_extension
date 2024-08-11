const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    popup: "./src/popup.ts",
    service_worker: "./src/service-worker.ts",
    youtube_music_controller: "./src/pages/youtube-music-controller.ts",
    shorts_controller: "./src/pages/shorts-controller.ts",
    youtube_controller: "./src/pages/youtube-controller.ts",
    twitch_controller: "./src/pages/twitch-controller.ts",
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  resolve: {
    extensions: [".ts", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.(ts)$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.(css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },

  plugins: [
    new CopyPlugin({
      patterns: [{ from: "static" }],
    }),

    new MiniCssExtractPlugin({
      filename: "styles/[name].css",
    }),
  ],
};
