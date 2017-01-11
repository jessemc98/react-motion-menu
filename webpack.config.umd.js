var path = require('path');
var merge = require('webpack-merge')
var common = require('./webpack.config.js')

module.exports = merge(
  {
    output: {
      path: path.join(__dirname, 'lib'),
      filename: 'index.js'
    },
    module: {
      loaders: [
        {
          test: /(\.js)|(\.jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: [
              "es2015",
              "react"
            ]
          }
        }
      ]
    }
  }
  ,common)
