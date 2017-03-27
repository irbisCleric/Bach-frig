const path = require("path");
const webpack = require("webpack");
const rucksack = require("rucksack-css");

const FOLDERS = {
    sourceFE: "./frontend",
    buildFE: "./dist",
};

module.exports = {
    context: path.resolve(__dirname, FOLDERS.sourceFE),
    entry: {
        app: "./index.js",
        html: "./index.html",
        vendor: [
            "react",
            "react-dom",
            "react-redux",
            "react-router",
            "react-router-redux",
            "redux",
        ],
    },

    output: {
        path: path.resolve(__dirname, FOLDERS.buildFE),
        filename: "[name]FE.bundle.js",
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: "react-hot-loader",
                    },
                    {
                        loader: "babel-loader",
                    },
                    {
                        loader: "eslint-loader",
                    },
                ],
                include: [
                    path.resolve(__dirname, "frontend"),
                ],
                exclude: [
                    path.resolve(__dirname, "/node_modules/"),
                ],
            },
            {
                test: /\.html$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: "[local]___[hash:base64:5]",
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: () => [
                                rucksack({
                                    autoprefixer: true,
                                }),
                            ],
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            // filename: "vendor.bundle.js",
            minChunks: Infinity,
        }),
        new webpack.DefinePlugin({
            "process.env": { NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development") },
        }),
    ],
    devServer: {
        //   proxy: { // proxy URLs to backend development server
        //       '/api': 'http://localhost:3000'
        //   },
        contentBase: path.join(__dirname, FOLDERS.sourceFE),
        hot: true,
        https: false,
        historyApiFallback: true,
        watchContentBase: true,
    },
};
