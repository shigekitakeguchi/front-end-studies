const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = [{
  mode: 'development',
  entry: {
    application: [
      './src/ts/index.ts',
      './src/js/index.js',
    ]
  },
  output: {
    path: `${__dirname}/app/js`,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options:{
            presets: ['es2015'],
            cacheDirectory: true
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json']
  }
}, {
  mode: 'development',
  entry: {
    application: './src/scss/style.scss'
  },
  output: {
    path: `${__dirname}/app/css`,
    filename: `bundle.css`,
    publicPath: '/css'
  },
  module: {
    rules: [
      {
        test: /\.css|scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?minimize', 'sass-loader']
        })
      }
    ]
  },
  resolve: {
    modules: ["web_modules", "node_modules"]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          require('autoprefixer')()
        ]
      }
    }),
    new BrowserSyncPlugin(
      {
        host: 'localhost',
        port: 8080,
        server: { baseDir: ['app'] }
      },
      {
        reload: true
      }
    )
  ]
}]