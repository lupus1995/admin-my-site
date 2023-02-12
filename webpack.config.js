// import path from "path";

// import HtmlWebpackPlugin from "html-webpack-plugin";
// import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
// import HTMLInlineCSSWebpackPlugin

/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HTMLInlineCSSWebpackPlugin =
  require("html-inline-css-webpack-plugin").default;

const isDevelopment = process.env.NODE_ENV === "development";
const isProduction = process.env.NODE_ENV === "production";

/**
 * устанавливаем для разработки два отдельных файла
 *
 * для режима development устанавливаем файл index.dev.tsx
 * для режима production устанавливаем файл index.prod.tsx
 */
let entryFile = null;

if (isDevelopment) {
  entryFile = "index.dev.tsx";
}

if (isProduction) {
  entryFile = "index.prod.tsx";
}

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    app: path.join(__dirname, "src", entryFile),
  },
  target: "web",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      utils: path.resolve(__dirname, "src/utils"),
      commons: path.resolve(__dirname, "src/commons"),
      components: path.resolve(__dirname, "src/components"),
      pages: path.resolve(__dirname, "src/pages"),
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
      template: path.join(__dirname, "src", "index.html"),
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
