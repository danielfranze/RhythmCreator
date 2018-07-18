// import modules
var webpack = require('webpack');
var path = require('path');

// define consts
const SOURCE_DIR = path.resolve(__dirname, 'src/');
const BUILD_DIR = path.resolve(__dirname, 'build/public');

// config and build process
var config = {
    mode: 'production',
    entry: './src/app.js', //SOURCE_DIR + '/app.js',
    output: {
        path: `${__dirname}/build/public/`, //BUILD_DIR,
        publicPath: 'public/',
        filename: "bundle.js"
    },
    // set dev-server configuration
    devServer: {
        inline: true,
        progress: true,
        contentBase: path.resolve('build'),
        port: 3434
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.sass$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
}

module.exports = config;
