const { resolve } = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const resolvePathName = path => resolve(__dirname, path);

module.exports = {
  entry: [resolvePathName('../src/js/app.jsx')],
  devtool: false,
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          {
            loader: 'sass-loader?sourceMap',
            options: {
              includePaths: [
                resolvePathName('../src/styles'),
                resolvePathName('../src/js'),
                resolvePathName('../assets'),
                resolvePathName('../node_modules')
              ],
              importLoaders: 1
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles-[hash].css',
      chunkFilename: '[name]-[id].css'
    })
  ]
};
