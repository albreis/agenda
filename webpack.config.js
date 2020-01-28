const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');


let config = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'www'),
    },
    module: {
        rules: [
            // this will apply to both plain `.scss` files
            // AND `<style lang="scss">` blocks in `.vue` files
            {
                test: /\.scss$/,
                use: [
                'vue-style-loader',
                'css-loader',
                'sass-loader'
                ]
            },
            {
                test: /\.sass$/,
                use: [
                  'vue-style-loader',
                  'css-loader',
                  {
                    loader: 'sass-loader',
                    options: {
                      indentedSyntax: true,
                      // sass-loader version >= 8
                      sassOptions: {
                        indentedSyntax: true
                      }
                    }
                  }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                  'vue-style-loader',
                  'css-loader',
                  {
                    loader: 'sass-loader',
                    options: {
                      // you can also read from a file, e.g. `variables.scss`
                      // use `data` here if sass-loader version < 8
                      prependData: `$color: red;`
                    }
                  }
                ]
            },
            {
                test: /\.less$/,
                use: [
                  'vue-style-loader',
                  'css-loader',
                  'less-loader'
                ]
            },
            {
                test: /\.styl(us)?$/,
                use: [
                  'vue-style-loader',
                  'css-loader',
                  'stylus-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                  'vue-style-loader',
                  {
                    loader: 'css-loader',
                    options: { importLoaders: 1 }
                  },
                  'postcss-loader'
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: file => (
                  /node_modules/.test(file) &&
                  !/\.vue\.js/.test(file)
                )
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: { 
                  appendTsSuffixTo: [/\.vue$/],
                }
            },
            {
              test: /\.tsx?$/,
              use: 'ts-loader',
              exclude: /node_modules/,
            },
            {
                test: /\.pug$/,
                oneOf: [
                  // this applies to `<template lang="pug">` in Vue components
                  // this applies to `<template lang="jade">` in Vue components
                  {
                    resourceQuery: /^\?vue/,
                    use: ['pug-plain-loader']
                  },
                  // this applies to pug imports inside JavaScript
                  {
                    use: ['raw-loader', 'pug-plain-loader']
                  }
                ]
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
              test : /\.(woff|woff2|eot|ttf|otf)$/,
              use : {
                loader : 'file-loader',
                options : {
                  name : './font/[name].[ext]'
                }
              }
            },
            {
              test : /\.(png|svg|jpg|gif)$/,
              use : {
                loader : 'file-loader',
                options : {
                  name : './image/[name].[ext]'
                }
              }
            },
            {
              test: /.html$/,
              loader: "vue-template-loader",
              exclude: /index.html/
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: false
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'www'),
        compress: true,
        port: 9000,
        host: '127.0.0.1',
        liveReload: false,
        writeToDisk: true,
        hot: true
    },
    resolve: {
      extensions: ['.vue', '.tsx', '.ts', '.js', '.jsx', '.scss', '.styl', '.sass', '.jade', '.css', '.gif', '.png', '.jpg', '.jpeg', '.svg']
    }
};

module.exports = config;