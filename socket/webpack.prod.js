const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const extractSass = new ExtractTextPlugin('css/[name].[contenthash].css');

module.exports = merge(common[0], {
    plugins: [
        extractSass,
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        new CleanWebpackPlugin(['build']),
        new ManifestPlugin({
            fileName: 'manifest.json',
            basePath: ''
        })
    ],
    output: {
        filename: '[name].bundle.[chunkhash].js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use:  extractSass.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: function () {
                                return [autoprefixer('last 6 versions')]
                            }
                        }

                    },'resolve-url-loader','sass-loader?sourceMap']
                })

            }
        ]
    }
});
