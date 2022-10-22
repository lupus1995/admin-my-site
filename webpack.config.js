/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default;

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
    alias:{
      utils: path.resolve( __dirname, 'src/utils' ),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(ts|js)x?$/i,
        use: 'ts-loader',
        exclude: '/node_modules/',
      },
      // { test: /\.scss$/, use: [
      //   { loader: 'style-loader' },  // to inject the result into the DOM as a style block
      //   { loader: 'css-modules-typescript-loader' },  // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
      //   { loader: 'css-loader', options: { modules: true } },  // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
      //   { loader: 'sass-loader', options: { sourceMap: true } },  // to convert SASS to CSS
      //   // NOTE: The first build after adding/removing/renaming CSS classes fails, since the newly generated .d.ts typescript module is picked up only later
      // ] },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devServer: {
    static: './dist',
    historyApiFallback: true,
  },
  optimization: {
    runtimeChunk: 'single',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
    }),
    new HTMLInlineCSSWebpackPlugin(),
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