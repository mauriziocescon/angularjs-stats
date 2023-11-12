const webpack = require('webpack');
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = () => {
  return {

    entry: './src/index.ts',

    devtool: 'inline-source-map',

    resolve: {
      // Add '.ts' and '.tsx' as a resolvable extension.
      extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.scss', '.html', '.json'],
    },

    optimization: {
      concatenateModules: true,
      usedExports: true,
    },

    plugins: [

      // clean dist folder
      new CleanWebpackPlugin(),

      new ESLintPlugin({
        extensions: ['ts', 'tsx'],
        emitError: true,
      }),
    ],

    module: {

      rules: [

        // all files with '.js' '.ts' '.tsx' extensions will be handled by ts-loader
        {
          test: /\.(js|ts|tsx)?$/,
          exclude: [/node_modules/],
          use: [
            {loader: 'babel-loader', options: {cacheDirectory: true, babelrc: true}},
            {loader: 'ts-loader'},
          ],
        },

        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        {
          test: /\.js$/,
          enforce: 'pre',
          use: [
            {loader: 'source-map-loader'},
          ],
        },
      ],
    },

    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'angular-stats.js',
      library: 'AngularStats',
      libraryTarget: 'umd',
    },
  };
};
