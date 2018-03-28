'use strict';

const fs = require('fs');

module.exports = {
  target: 'node',
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: './[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      }, {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          }
        }
      }
    ]
  },
  plugins: []
};
