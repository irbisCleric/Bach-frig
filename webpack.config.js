const PATH = require('path');
const WEBPACK = require('webpack');

const FOLDERS = {
        sourceFE: './frontend',
        buildFE: './dist'

};

module.exports = {
    context: PATH.resolve(__dirname, FOLDERS.sourceFE),
    entry: {
        app: './index.js'
    },
    output: {
        path: PATH.resolve(__dirname, FOLDERS.buildFE),
        filename: '[name]FE.bundle.js'
    }
}