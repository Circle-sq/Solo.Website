const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const entry = path.join(__dirname, '../src/styles-next/index.scss');

module.exports = {
    mode: 'production',
    // stats: { warnings: false },
    entry: {
        main: entry,
    },
    output: {
        clean: true,
        pathinfo: true,
        path: path.resolve(__dirname, 'buildcss'),
        filename: 'entry.js',
        publicPath: '/static/',
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                auto: true,
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                minimize: false,
                                outputStyle: 'expanded',
                                quietDeps: true,
                            },
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: ['autoprefixer'],
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ],
};
