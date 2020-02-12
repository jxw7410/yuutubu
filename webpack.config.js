const path = require('path');

module.exports = {
  context: __dirname,
  entry: ['babel-polyfill', './frontend/yuutubu.js'],
  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '*']
  },
  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.js?$/], 
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['@babel/env', '@babel/react']
          }
        },
      }
    ]
  },
  devtool: 'eval-source-map'
};