/*eslint-disable */
const path = require("path");
const webpack = require("webpack");
const rucksack = require("rucksack-css");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const project = require("./project.config");

const webpackConfig = {
    // context :  project.paths.client(),
    name    :  "client",
    target  :  "web",
    resolve :  {
        modules  :  [
            project.paths.client(),
            "node_modules",
        ],
        extensions  :  [".js", ".jsx", ".json"],
    },
    module  :  {},
};

// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY = project.paths.client("main.js");
const APP_HTML = project.paths.client("index.html");

webpackConfig.entry = {
    app     :  [APP_ENTRY],
    // html    :  APP_HTML,
    vendor  :  project.compiler_vendors,
};

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
    filename    :  "[name]FE.js",
    path        :  project.paths.dist(),
    publicPath  :  project.compiler_public_path,
};

// ------------------------------------
// Loaders (rules)
// ------------------------------------
// JavaScript / JSON
webpackConfig.module.rules = [{
    test: /\.(js|jsx)$/,
    use: [
        {
            loader: "react-hot-loader",
        },
        {
            loader: "babel-loader",
            options: project.compiler_babel,
        },
        {
            loader: "eslint-loader",
            options: {
                failOnWarning: false,
                failOnError: true,
            },
        },
    ],
    include: [
        project.paths.client(),
    ],
    exclude: [
        path.resolve(__dirname, "/node_modules/"),
    ],
}];

// ------------------------------------
// Template Loaders (rules)
// ------------------------------------
// HTML
// webpackConfig.module.rules.push({
//     test: /\.html$/,
//     loader: "file-loader",
//     options: {
//         name: "[name].[ext]",
//     },
// });

// ------------------------------------
// Style Loaders
// ------------------------------------
// Wea are using postcss for autoprefixer so added postcss-loader
webpackConfig.module.rules.push({
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
                importLoaders: true,
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
});

// ------------------------------------
// Plugins
// ------------------------------------
// TODO: Add HtmlWebpackPlugin
webpackConfig.plugins = [
    new webpack.DefinePlugin({
        "process.env": { NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development") },
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        // filename: "vendor.bundle.js",
        minChunks: Infinity,
    }),
    new HtmlWebpackPlugin({
        template : APP_HTML,
        hash     : false,
        // favicon  : project.paths.public('favicon.ico'),
        filename : 'index.html',
        inject   : 'body',
        minify   : {
        collapseWhitespace : true
        }
    }),
    // new webpack.HotModuleReplacementPlugin(),
    // new BundleAnalyzerPlugin(),
];

// ------------------------------------
// Dev server
// ------------------------------------
webpackConfig.devServer = {
    contentBase         :  project.paths.client(),
    hot                 :  true,
    https               :  false,
    historyApiFallback  :  true,
    watchContentBase    :  true,
};

module.exports = webpackConfig;
