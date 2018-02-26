// tslint:disable:object-literal-sort-keys max-line-length no-console
const webpack = require("webpack");
const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");
const {CheckerPlugin} = require("awesome-typescript-loader");

module.exports = () => {
    return {

        entry: "./src/index.ts",

        resolve: {
            // Add ".ts" and ".tsx" as a resolvable extension.
            extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".scss", ".html", ".json"],
        },

        plugins: [

            // scope hoisting
            new webpack.optimize.ModuleConcatenationPlugin(),

            // clean dist folder
            new CleanPlugin(["dist", "build"], {
                root: path.resolve(__dirname, "../"),
                verbose: true,
                dry: false,
                exclude: [],
            }),

            new CheckerPlugin(),
        ],

        module: {

            rules: [

                // all files with ".js .ts .tsx" extensions will be handled by ts-loader
                {
                    test: /\.(js|ts|tsx)?$/,
                    exclude: [/node_modules/],
                    use: [
                        {loader: "awesome-typescript-loader", options: {useBabel: true, useCache: true}},
                    ],
                },

                // preprocess
                {
                    test: /\.(js|ts|tsx)?$/,
                    exclude: [/node_modules/],
                    enforce: "pre",
                    use: [
                        {loader: "tslint-loader", options: {emitErrors: false, formatter: "stylish"}},
                        {loader: "preprocess-loader", options: {}},
                    ],
                },

                // All output ".js" files will have any sourcemaps re-processed by "source-map-loader".
                {
                    test: /\.js$/,
                    enforce: "pre",
                    use: [
                        {loader: "source-map-loader"},
                    ],
                },
            ],
        },

        output: {
            path: path.resolve(__dirname, "../dist"),
            filename: "angular-stats.js",
            library: "AngularStats",
            libraryTarget: "umd",
        },
    };
};
