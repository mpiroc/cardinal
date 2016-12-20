import HtmlWebpackPlugin from 'html-webpack-plugin'

const paths = {
  app: __dirname + '/app/',
  dist: __dirname + '/dist/',
}

const htmlWebpackPluginConfig = {
  title: 'Cardinal',
  filename: 'index.html',
  template: paths.app + 'index.html',
  inject: 'body',
}

const webpackConfig = {
  entry: paths.app + 'index.js',
  output: {
    path: paths.dist,
    filename: 'index_bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [ paths.app ],
        loader: 'babel'
      },
      {
        test: /\.css$/,
        include: [ paths.app ],
        loader: 'style!css',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(htmlWebpackPluginConfig),
  ],
}

export default webpackConfig