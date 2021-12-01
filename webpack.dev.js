/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const { merge } = require('webpack-merge');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      { test: /\.ts(x?)$/, loader: 'ts-loader', exclude: /node_modules/ },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { modules: true } },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  devServer: {
    devMiddleware: { writeToDisk: true },
    static: './dist',
    historyApiFallback: true,
    port: 8080,
  },
  plugins: [
    new DefinePlugin({
      'process.env.API_URL': JSON.stringify('http://fordevs.herokuapp.com/api'),
    }),
    new HtmlWebpackPlugin({ template: './template.dev.html' }),
  ],
});
