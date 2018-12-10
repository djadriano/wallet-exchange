const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const nodeEnv = process.env.NODE_ENV;
const commonConfig = require('./common.json');

const resolvePathName = path => resolve(__dirname, path);

module.exports = {
  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: 8080,
    publicPath: '/',
    historyApiFallback: true,
    disableHostCheck: true,
    stats: 'errors-only',
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    open: false
  },
  output: {
    filename: 'bundle-[hash].js',
    path: resolvePathName('../dist'),
    publicPath: '/'
  },
  performance: { hints: false },
  context: resolvePathName('../src'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|ico|mp4|mov|svg|webm|pdf|zip)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              useRelativePath: false,
              outputPath: 'assets',
              context: 'assets'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              outputPath: 'assets',
              context: 'assets'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css', 'jpg', 'png'],
    alias: {
      styles: resolvePathName('../src/styles'),
      js: resolvePathName('../src/js'),
      assets: resolvePathName('../assets')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      common: JSON.stringify(commonConfig)
    }),
    new HtmlWebpackPlugin({
      title: commonConfig.title,
      namespace: commonConfig.namespace,
      template: '../src/index.html',
      filename: 'index.html'
    })
  ]
};
