/* jshint node: true */
var path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),

  output: {
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
      }
    ]
  }
};
