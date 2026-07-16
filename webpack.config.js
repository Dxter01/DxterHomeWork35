const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const plugins = [
    new HtmlWebpackPlugin({
        template: './index.html'
    }),
];

if (process.env.ANALYZE) {
    plugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
    mode: 'development',
    entry: './main.js',
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    plugins: plugins,
    stats: {
        children: true
    },
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        open: true,
        hot: true,
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test:/\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test:/\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
}
