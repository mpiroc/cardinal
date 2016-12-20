import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import path from 'path'

const npmCommand = process.env.BABEL_ENV = process.env.npm_lifecycle_event
const isProduction = npmCommand === 'production'

const paths = {
  app: path.join(__dirname, 'app'),
  dist: path.join(__dirname, 'dist'),
}

const htmlWebpackPluginConfig = {
  title: 'Cardinal',
  filename: 'index.html',
  template: path.join(paths.app, 'index.html'),
  inject: 'body',
}

const baseConfig = {
  entry: [
    paths.app
  ],
  output: {
    path: paths.dist,
    filename: 'index_bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: 'style!css?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]',
      },
    ],
  },
  resolve: {
    root: path.resolve('./app'),
  },
}

const productionConfig = {
  devtool: 'cheap-module-source-map',
  plugins: [
    new HtmlWebpackPlugin(htmlWebpackPluginConfig),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
}

const developmentConfig = {
  devtool: 'cheap-module-inline-source-map',
  devSever: {
    contentBase: paths.dist,
    hot: true,
    inline: true,
    progress: true,
  },
  plugins: [
    new HtmlWebpackPlugin(htmlWebpackPluginConfig),
    new webpack.HotModuleReplacementPlugin(),
  ]
}

const finalConfig = {
  ...baseConfig,
  ...(isProduction ? productionConfig : developmentConfig)
}

export default finalConfig