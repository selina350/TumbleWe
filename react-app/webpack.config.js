const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
require('dotenv').config({ path: '../.env' })
const webpack = require('webpack')

console.log('process.env.MOCK_API', process.env.MOCK_API)
const isMockAPIEnabled = process.env.MOCK_API === 'true'

module.exports = {
  mode: 'development',
  entry: [
    './index.js',
    ...(isMockAPIEnabled ? ['./mockApi/index.js'] : []),
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new HtmlWebpackPlugin({
      template: './demo.html',
      filename: 'demo.html',
      inject: false,
    }),
    new webpack.DefinePlugin({
      'process.env.S3_BUCKET': JSON.stringify(process.env.S3_BUCKET),
      'process.env.S3_ACCESS_KEY_ID': JSON.stringify(
        process.env.S3_ACCESS_KEY_ID),
      'process.env.S3_SECRET_ACCESS_KEY': JSON.stringify(
        process.env.S3_SECRET_ACCESS_KEY),
    }),
  ],
  devtool: 'source-map',
  devServer: {
    setupMiddlewares: (middlewares, devServer) => {
      devServer.app.get('/', function (req, res, next) {
        const subdomain = req.headers.host.split('.')[0]
        if (subdomain === 'app') {
          devServer.compiler.outputFileSystem.readFile(
            path.join(devServer.compiler.outputPath, 'demo.html'),
            (err, result) => {
              if (err) {
                next(err)
              }
              res.set('content-type', 'text/html')
              res.send(result)
              res.end()
            })
        }else {
          next()
        }
      })
      return middlewares
    },
    historyApiFallback: true,
    allowedHosts: [
      'www.lvh.com',
      'app.lvh.com',
    ],
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://www.lvh.com:8080',
        router: () => 'http://localhost:5000',
      },
    },
  },
}
