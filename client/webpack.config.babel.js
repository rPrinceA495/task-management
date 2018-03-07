import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';

function getBundleName(ext) {
  return process.env.NODE_ENV === 'production' ? `bundle-[hash].${ext}` : `bundle.${ext}`;
}

function getPlugins() {
  const plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new ExtractTextPlugin(getBundleName('css')),
  ];
  if (process.env.NODE_ENV === 'production') {
    plugins.push(new ManifestPlugin());
  }
  return plugins;
}

export default {
  entry: path.join(__dirname, 'index.jsx'),
  output: {
    path: path.join(__dirname, '../dist/client'),
    filename: getBundleName('js'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          __dirname,
          path.join(__dirname, '../common'),
        ],
        loader: 'babel-loader',
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
          }],
        }),
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
          }, {
            loader: 'sass-loader',
            options: {
              precision: 8,
              includePaths: [
                path.join(__dirname, '../node_modules/bootstrap-sass/assets/stylesheets'),
              ],
            },
          }],
        }),
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff',
      }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  plugins: getPlugins(),
};
