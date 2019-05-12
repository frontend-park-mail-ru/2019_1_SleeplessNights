const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: './public/app/app.js',
    output: {
        path: path.resolve(__dirname, './public/assets/js'),
        filename: 'bundle.js'
    },
    optimization: {
        minimize: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"],
                        root: 'babel.cwd',
                        plugins: ['@babel/plugin-proposal-class-properties'],
                    }
                }
            },
            {
                test: /\.scss$/,
                loader: [ "sass-loader", "css-loader", MiniCssExtractPlugin.loader]
            }
        ]
    },
};
