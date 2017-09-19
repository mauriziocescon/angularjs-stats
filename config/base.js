// tslint:disable:object-literal-sort-keys max-line-length no-console
const webpack = require("webpack");
const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = () => {
    return {

        entry: "./index.ts",

        // Enable sourcemaps for debugging webpack's output.
        devtool: "source-map",

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

            new ForkTsCheckerWebpackPlugin({
                tslint: true,
                watch: ["./src/"], // optional but improves performance (less stat calls)
            }),
        ],

        module: {

            rules: [

                // all files with ".js .ts .tsx" extensions will be handled by ts-loader
                {
                    test: /\.(js|ts|tsx)?$/,
                    exclude: [/node_modules/, /config/],
                    use: [
                        {loader: "cache-loader"},
                        // there should be 1 cpu for the fork-ts-checker-webpack-plugin
                        {loader: "thread-loader", options: {workers: require("os").cpus().length - 1}},
                        {loader: "babel-loader", options: {cacheDirectory: true}},
                        {loader: "ts-loader", options: {happyPackMode: true}},
                    ],
                },

                // preprocess
                {
                    test: /\.(js|ts|tsx)?$/,
                    exclude: [/node_modules/, /config/],
                    enforce: "pre",
                    use: [
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
