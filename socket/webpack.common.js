const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');

var baseConf = {
    context: path.join(__dirname, 'web'),
    entry: {
        main: './app.js',
        vendor: [
            "jquery",
            'bootstrap/js/dist/util',
            'bootstrap/js/dist/alert',
            'bootstrap/js/dist/button',
            'bootstrap/js/dist/carousel',
            'bootstrap/js/dist/collapse',
            'bootstrap/js/dist/dropdown',
            'bootstrap/js/dist/modal',
            'bootstrap/js/dist/tooltip',
            'bootstrap/js/dist/popover',
            'bootstrap/js/dist/scrollspy',
            'bootstrap/js/dist/tab'
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/[id].css"
        }),
        new webpack.HashedModuleIdsPlugin(),
        new CopyWebpackPlugin([
                {from: 'css/**/*'}
            ],
            {
                ignore: ['*.scss']
            }
        ),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
            Alert: 'exports-loader?Alert!bootstrap/js/dist/alert',
            Button: 'exports-loader?Button!bootstrap/js/dist/button',
            Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel',
            Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
            Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
            Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
            Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
            Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
            Tab: 'exports-loader?Tab!bootstrap/js/dist/tab',
            Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
            Util: 'exports-loader?Util!bootstrap/js/dist/util',
            CookieWarning: 'exports-loader?CookieWarning!simple-cookie-handler/dist/cookie.min',
            videojs: 'video.js/dist/video.cjs.js',
            RecordRTC: 'recordrtc',
            MediaStreamRecorder: ['recordrtc', 'MediaStreamRecorder']
        })
    ],
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|jpeg|svg|eot)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            emitFile: false, // copy loaded files in css
                            useRelativePath: true,
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader'
                }
            },
            {
                test: /\.(svg|eot)$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    useRelativePath: true,
                    emitFile: false,
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    "css-loader"
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/',
                        publicPath: '../fonts/'
                    }
                }]
            }
        ]
    },
    resolve: {
        alias: {
            fullcalendar: 'fullcalendar/dist/fullcalendar',
            videojs: 'video.js'
        }
    },
    optimization: {
        runtimeChunk: {
            name: entrypoint => 'runtime'
        }
    }
};

var webConf = merge(baseConf, {
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'web/dist')
    }
});


var cakeConf = merge( baseConf, {
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'bikefittr/webroot/dist')
    }
});

module.exports = [
    webConf, cakeConf
];
