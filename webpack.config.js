var webpack = require('webpack');
var path = require('path');
var package = require('./package.json');

// variables
process.env.NODE_ENV = 'development';
var isProduction = process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === 'production';
var sourcePath = path.join(__dirname, './src');
var outPath = path.join(__dirname, './build');

// plugins
// var HtmlWebpackPlugin = require('html-webpack-plugin');
// var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: ['node_modules', 'build']
  },
  context: sourcePath,
  entry: {
    app: ["@babel/polyfill", './main.tsx'],
    background: [
      './extension/background/background.ts'
    ]
  
  },
  output: {
    path: outPath,
    filename: "[name].js"
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    // Fix webpack's default behavior to not load packages with jsnext:main module
    // (jsnext:main directs not usually distributable es6 format, but es6 sources)
    mainFields: ['module', 'browser', 'main'],
    alias: {
      app: path.resolve(__dirname, 'src/app/'),
      'react-dom': '@hot-loader/react-dom'
    }
  },
  module: {
    rules: [
      // .ts, .tsx
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              [
                "@babel/preset-env",
                { targets: { browsers: "last 2 versions" } } // or whatever your project requires
              ],
              "@babel/preset-typescript",
              "@babel/preset-react"
            ],
            plugins: [
              // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
              ["@babel/plugin-proposal-decorators", { legacy: true }],
              ["@babel/plugin-proposal-class-properties", { loose: true }],
              "react-hot-loader/babel"
            ]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            query: {
              modules: true,
              sourceMap: !isProduction,
              importLoaders: 1,
              localIdentName: isProduction ? '[hash:base64:5]' : '[local]__[hash:base64:5]'
            }
          },
          {
            loader: "sass-loader",
            options: {

            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // static assets
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.(a?png|svg)$/,
        use: 'url-loader?limit=10000'
      },
      {
        test: /\.(jpe?g|gif|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/,
        use: 'file-loader'
      }
    ]
  },
  // optimization: {
  //   splitChunks: {
  //     name: true,
  //     cacheGroups: {
  //       commons: {
  //         chunks: 'initial',
  //         minChunks: 2
  //       },
  //       vendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         chunks: 'all',
  //         filename: isProduction ? 'vendor.[contenthash].js' : 'vendor.[hash].js',
  //         priority: -10
  //       }
  //     }
  //   },
  //   runtimeChunk: true
  // },
  plugins: [
    // new ForkTsCheckerWebpackPlugin(__dirname),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false
    }),
    // new WebpackCleanupPlugin({
    //   cleanStaleWebpackAssets: false,
    // }),
    // new HtmlWebpackPlugin({
    //   template: 'assets/index.html',
    //   minify: {
    //     minifyJS: false,
    //     minifyCSS: false,
    //     removeComments: true,
    //     useShortDoctype: true,
    //     collapseWhitespace: true,
    //     collapseInlineTagWhitespace: true
    //   },
    //   append: {
    //     // head: `<script src="//cdn.polyfill.io/v3/polyfill.min.js"></script>`
    //   },
    //   meta: {
    //     title: package.name,
    //     description: package.description,
    //     keywords: Array.isArray(package.keywords) ? package.keywords.join(',') : undefined
    //   }
    // }),
    new CopyWebpackPlugin([{
      from: "assets"
    }]),
  ],
  devServer: {
    contentBase: sourcePath,
    hot: true,
    inline: true,
    historyApiFallback: {
      disableDotRule: true
    },
    stats: 'minimal',
    clientLogLevel: 'warning'
  },
  // https://webpack.js.org/configuration/devtool/
  devtool: isProduction ? 'hidden-source-map' : 'cheap-module-eval-source-map',
  node: {
    // workaround for webpack-dev-server issue
    // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
    fs: 'empty',
    net: 'empty'
  }
};