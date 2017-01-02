import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import path from 'path'
import autoprefixer from 'autoprefixer'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const npmCommand = process.env.BABEL_ENV = process.env.npm_lifecycle_event
const isProduction = npmCommand === 'production'

const paths = {
  app: path.join(__dirname, 'app'),
  dist: path.join(__dirname, 'dist'),
}

const htmlWebpackPluginConfig = {
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
        test: /(\.scss|\.css)$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass')
      },
    ],
  },
  postcss: [autoprefixer],
  sassLoader: {
    data: '@import "theme/_config.scss";',
    includePaths: [path.resolve(__dirname, './app')]
  },
  resolve: {
    root: path.resolve('./app'),
    extensions: ['', '.scss', '.css', '.js', '.json'],
  },
}

const productionConfig = {
  devtool: 'cheap-inline-source-map',
  plugins: [
    new ExtractTextPlugin('index_bundle.css', { allChunks: true }),
    new HtmlWebpackPlugin(htmlWebpackPluginConfig),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
}

const developmentConfig = {
  devtool: 'inline-source-map',
  devSever: {
    contentBase: paths.dist,
    hot: true,
    inline: true,
    progress: true,
  },
  plugins: [
    new ExtractTextPlugin('index_bundle.css', { allChunks: true }),
    new HtmlWebpackPlugin(htmlWebpackPluginConfig),
  ]
}

const finalConfig = {
  ...baseConfig,
  ...(isProduction ? productionConfig : developmentConfig)
}

export default finalConfig