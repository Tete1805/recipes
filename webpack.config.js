const webpack = require('webpack');
const path = require('path');

let config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './public/javascripts/vendors'),
    filename: './bundle.js'
  }
};

module.exports = config;
