const webpackcep = require("webpack")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const modoDev = process.env.NODE_ENV !== 'production'
const CopyWebpackPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  mode: modoDev ? 'development' : 'production',
  entry: './src/cep.js',
  output: {
    filename: 'principal.js',
    path: __dirname + '/public'
  },
  plugins: [
    new CopyWebpackPlugin ([
      { context: "src/", from: "**/*.html" },
      { context: "src/", from: "img/**/*" }
    ]),
    new MiniCssExtractPlugin({
      filename: "estilo.css"
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({cache: true, parallel: true}),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  devServer: {
    contentBase: "./public",
    port: 9000,
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 
        // 'style-loader',
        'css-loader']
      }, {
      test: /\.(jpg|gif|svg|png)$/,
      use: ['file-loader']
      },
      {test: /\.html$/,
        use: ["html-loader"]
      }
    ]
  }
}