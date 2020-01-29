'use strict';

const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const helpers = require('./helpers');
const isDev = process.env.NODE_ENV === 'development';

console.log(process.env.NODE_ENV);


const webpackConfig = {
  entry: {
    polyfill: '@babel/polyfill',
    main: helpers.root('src', 'main'),
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue$: isDev ? 'vue/dist/vue.esm.js' : 'vue/dist/vue.runtime.min.js',
      '@': helpers.root('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [helpers.root('src')],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [helpers.root('src')],
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: isDev } },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: isDev } },
          { loader: 'sass-loader', options: { sourceMap: isDev } },
        ],
      },
      {
        test: /\.sass$/,
        use: [
          isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: isDev } },
          { loader: 'sass-loader', options: { sourceMap: isDev } },
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [{ loader: 'file-loader', options: { name: 'fonts/[name].[ext]' } }],
      },
      {
        test: /\.(svg)(\?.*)?$/,
        use: [{ loader: 'svg-sprite-loader', options: { runtimeCompat: true } }, { loader: 'svgo-loader' }],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlPlugin({ template: 'public/index.html', chunksSortMode: 'dependency' }),
    new webpack.NormalModuleReplacementPlugin(
      /element-ui[\/\\]lib[\/\\]locale[\/\\]lang[\/\\]zh-CN/,
      'element-ui/lib/locale/lang/ru-RU'
    ),
  ],
};

module.exports = webpackConfig;
