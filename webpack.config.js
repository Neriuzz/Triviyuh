// Imports
let path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// Exports
module.exports = {
    entry: {
        "main": "./client/main.js"
    },
    output: {
        path: path.resolve(__dirname, "static/js"),
        filename: "bundle.min.js"
    },
    optimization: {
        minimize: true
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }, {
                test: /\.vue$/,
                include: path.resolve(__dirname, "client"),
                use: "vue-loader"
            }, {
                test: /\.sass$/,
                use: [
                    "vue-style-loader",
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            sassOptions: {
                                indentedSyntax: true
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
    resolve: {
        alias: {
            vue: 'vue/dist/vue.common.js'
        }
    }
};