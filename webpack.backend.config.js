const path = require("path");
const webpack = require("webpack");

const FOLDERS = {
    sourceBE: "./backend",
    buildBE: "./dist/server",
};

module.exports = {
    context: path.resolve(__dirname, FOLDERS.sourceBE),
    entry: {
        app: "./index.js",
    },
    output: {
        path: path.resolve(__dirname, FOLDERS.buildBE),
        filename: "backend.bundle.js",
    },
    target: "node",
    node: {
        console: false,
        global: true,
        process: true,
        Buffer: true,
        __filename: "mock",
        __dirname: "mock",
        setImmediate: true,
    },
    plugins: [
        new webpack.IgnorePlugin(/vertx/),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                ["es2015", { modules: false }],
                            ],
                        },
                    },
                    {
                        loader: "eslint-loader",
                    },
                ],
                include: [
                    path.resolve(__dirname, "backend"),
                ],
                exclude: [
                    path.resolve(__dirname, "/node_modules/"),
                ],
            },
        ],
    },
};
