const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const PurgecssPlugin = require('purgecss-webpack-plugin')
let glob = require('glob-all')

const distFolder = path.resolve(__dirname, 'dist')
const jsLoader = 'babel-loader!standard-loader?error=true'

// Custom PurgeCSS extractor for Tailwind that allows special characters in class names.
// https://github.com/FullHuman/purgecss#extractor
class TailwindExtractor {
  static extract (content) {
    return content.match(/[A-z0-9-:/]+/g) || []
  }
}

module.exports = {
  entry: './src/js/main.js',
  mode: process.env.NODE_ENV === 'prod' ? 'production' : 'development',
  output: {
    filename: '[name].bundle.js?[hash]',
    path: distFolder
  },
  devtool: process.env.NODE_ENV === 'prod' ? '' : 'eval-source-map',
  plugins: [
    new PurgecssPlugin({
      // Specify the locations of any files you want to scan for class names.
      paths: glob.sync([
        path.join(__dirname, 'src/index.html')
      ]),
      extractors: [
        {
          extractor: TailwindExtractor,
          // Specify the file extensions to include when scanning for
          // class names.
          extensions: ['html']
        }
      ]
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      inject: true,
      title: 'Enrico Icardi - Product Manager & Development',
      baseUrl: '/',
      alwaysWriteToDisk: true
    }),
    new CopyWebpackPlugin([
      { from: path.join(__dirname, 'src/img/favicon.png'), to: 'favicon.png' },
      { from: path.join(__dirname, 'src/browserconfig.xml'), to: 'browserconfig.xml' },
      { from: path.join(__dirname, 'src/humans.txt'), to: 'humans.txt' },
      { from: path.join(__dirname, 'src/robots.txt'), to: 'robots.txt' },
      { from: path.join(__dirname, 'src/site.webmanifest'), to: 'site.webmanifest' }
    ]),
    new FaviconsWebpackPlugin(path.join(__dirname, 'src/img/favicon.png')),
    new HtmlWebpackHarddiskPlugin(),
    new OfflinePlugin(),
    new ExtractTextPlugin('style.css?[hash]'),
    new CleanWebpackPlugin([distFolder])
    // debug bundle (for optimisation)
    // new BundleAnalyzerPlugin()
  ],
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: jsLoader
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: 'postcss.config.js'
                }
              }
            }
          ]
          // publicPath: '/web'
        })
      }
    ]
  }
}
