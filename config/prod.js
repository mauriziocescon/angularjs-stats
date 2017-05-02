const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const commonConfig = require("./base.js");

module.exports = function (env) {
    return webpackMerge(commonConfig(env), {

        plugins: [

            new webpack.optimize.UglifyJsPlugin({
                mangle: {
                    keep_fnames: true
                }
            }),

            new webpack.DefinePlugin({
                "process.env": {
                    "ENV": JSON.stringify("production")
                }
            })

        ],

        // When importing a module whose path matches one of the following, just
        // assume a corresponding global variable exists and use that instead.
        // This is important because it allows us to avoid bundling all of our
        // dependencies, which allows browsers to cache those libraries between builds.
        externals: {
            "angular": "angular",
            "jquery": "$"
        }
    });
};