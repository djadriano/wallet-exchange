const { resolve } = require('path');
const webpack = require('webpack');

const resolvePathName = path => resolve(__dirname, path);

module.exports = {
  entry: [resolvePathName('../src/js/app.jsx')],
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader?sourceMap',
            options: { importLoaders: 1 }
          },
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
  plugins: [new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin()]
};
