/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

/**
 * устанавливаем для разработки два отдельных файла
 *
 * для режима development устанавливаем файл index.dev.tsx
 * для режима production устанавливаем файл index.prod.tsx
 */
let entryFile = null;

if (isDevelopment) {
  entryFile = 'index.dev.tsx';
}

if (isProduction) {
  entryFile = 'index.prod.tsx';
}

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    app: path.join(__dirname, 'src', entryFile),
  },
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        use: 'ts-loader',
        exclude: '/node_modules/',
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: './dist',
  },
  optimization: {
    runtimeChunk: 'single',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
    }),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        enabled: true,
        files: './src/**/*.{ts,tsx,js,jsx}',
        options: {
          fix: true,
        },
      },
      async: true,
      typescript: {
        configFile: './tsconfig.json',
      },
    }),
  ],
};