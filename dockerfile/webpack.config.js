const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: "source-map",
    devServer: {
        hot: true,
        inline: true,
        host: 'localhost',
        port: 8080
    },
    entry: {
        index: './src/index.js',
        condition: './src/condition.js',
        stock: './src/stock.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/base.html',
            chunks: ['index', ]
        }),
        new HtmlWebpackPlugin({
            filename: 'condition.html',
            template: './src/base.html',
            chunks: ['condition', ]
        }),
        new HtmlWebpackPlugin({
            filename: 'stock.html',
            template: './src/base.html',
            chunks: ['stock', ]
        }),
    ]
}