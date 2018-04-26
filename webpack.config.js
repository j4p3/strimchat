'use strict';

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
        options: {
          presets: ['env']
        }
      }
    ]
  },
  externals: ['sqlite3', 'tedious', 'pg-hstore']
};
