// import path from "path";

// import HtmlWebpackPlugin from "html-webpack-plugin";
// import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
// import HTMLInlineCSSWebpackPlugin

/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

const nodeExternals = require("webpack-node-externals");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HTMLInlineCSSWebpackPlugin =
  require("html-inline-css-webpack-plugin").default;

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    app: path.join(__dirname, ".", "index.tsx"),
  },
  target: "node",
  performance: {
    hints: false,
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      utils: path.resolve(__dirname, "../src/utils"),
      commons: path.resolve(__dirname, "../src/commons"),
      components: path.resolve(__dirname, "../src/components"),
      pages: path.resolve(__dirname, "../src/pages"),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(ts|js)x?$/i,
        use: "ts-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: "file-loader",
      },
    ],
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  devServer: {
    static: "./dist",
    historyApiFallback: true,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../src", "index.html"),
    }),
    new HTMLInlineCSSWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        enabled: true,
        files: "./src/**/*.{ts,tsx,js,jsx}",
        options: {
          fix: true,
        },
      },
      async: true,
      typescript: {
        configFile: "./tsconfig.json",
      },
    }),
  ],
};
