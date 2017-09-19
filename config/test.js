// tslint:disable:object-literal-sort-keys max-line-length no-console
const webpack = require("webpack");
const path = require("path");
const webpackMerge = require("webpack-merge");
const commonConfig = require("./base.js");

module.exports = (env) => {
    return webpackMerge(commonConfig(env), {

        entry: ["./index.ts", "./src/angular-stats.service.spec.ts"],

        devtool: "cheap-module-eval-source-map",

        plugins: [

            new webpack.DefinePlugin({
                "process.env": {
                    "ENV": JSON.stringify("test"),
                },
            }),
        ],

        // When importing a module whose path matches one of the following, just
        // assume a corresponding global variable exists and use that instead.
        // This is important because it allows us to avoid bundling all of our
        // dependencies, which allows browsers to cache those libraries between builds.
        externals: {
            "angular": "angular",
            "jquery": "$",
        },
    });
};
