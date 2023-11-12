const webpack = require('webpack');
const path = require('path');
const {merge} = require('webpack-merge');
const commonConfig = require('./base.js');

module.exports = (env) => {
  return merge(commonConfig(env), {

    entry: ['./src/index.ts', './src/angular-stats/angular-stats.service.spec.ts'],

    mode: 'development',

    plugins: [

      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('test'),
        },
      }),
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
      'angular': 'angular',
    },
  });
};
