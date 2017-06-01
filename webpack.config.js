const path = require('path');
const public = path.join(__dirname, '/public');
module.exports = {
  entry: path.join(public, '/js/main.js'),
  output: {
    path: path.join(public, '/dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  }
};
