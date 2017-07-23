var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var webpack = require('webpack');
webpack.ExtractTextPlugin = require('extract-text-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var defaultChunks = [
  'vendor'
];

module.exports = {
    context: path.resolve('./app'),
    entry: {
        vendor: [
            './main',
            './scss/style.scss'
        ],
        index: [
            './modules/dashboard/script',
            './modules/dashboard/style.scss'
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "[name].js"
    },
    module: {
        devtool: 'source-map',
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/,
            query: {
                presets: ['es2015']
            }
        },{
            test: /\.html$/,
            loader: 'html'
        },{
            test: /\.(jpe?g|png|gif|svg)$/,
            loader:'file?name=./img/[name].[ext]'
        },{
            test: /\.css$/,
            loader: webpack.ExtractTextPlugin.extract(
                'style',
                'css!postcss-loader'
            )
        },{
            test: /\.scss$/,
            loader: webpack.ExtractTextPlugin.extract(
                'style',
                'css-loader!postcss-loader!resolve-url-loader!sass'
            )
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: './modules/dashboard/index.html',
            filename: 'index.html',
            chunks: defaultChunks.concat(['index'])
        }),
        new webpack.ExtractTextPlugin('[name].css'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.Tether': 'tether',
            Tether: 'tether',
        }),
        new BrowserSyncPlugin({
            server: {
                baseDir: ['dist']
            },
            port: 3000,
            host: 'localhost',
            open: false
        }),
        new CopyWebpackPlugin([{
            from: './data/**/*',
            to: './'
        }])
    ]
}