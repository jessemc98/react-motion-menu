/* jshint node: true */
var path = require('path');


module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),

  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'Build',
  },
  externals: {
    'react': 'react',
    'react-dom': 'react-dom'
  },
  module: {
    loaders: [
      {
        test: /\.(scss|css|sass)$/,
        loaders: ['style', 'css', 'sass'],
        include: path.join(__dirname)
      },
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
};
