var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var OptimizeJsPlugin = require('optimize-js-plugin');
var path = require('path');

var env = process.env.NODE_ENV || 'production';

var plugins = [
    new HtmlWebpackPlugin({
        template: 'app/client/index.html',
        filename: 'index.html',
        inject: 'body',
    }),
];

console.log('NODE_ENV:', env);

if (env === 'production') {
    plugins.push(
        new UglifyJSPlugin(),
        new OptimizeJsPlugin({
            sourceMap: false
        })
    );
}


module.exports = {
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './app/client/index.js'
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'app/public'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader'},
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: plugins
};