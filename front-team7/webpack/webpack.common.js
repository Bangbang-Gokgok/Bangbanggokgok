const path = require('path');

const webpack = require('webpack');
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 엔트리 포인트는 webpack이 내부의 디펜던시 그래프 를 생성하기 위해 사용해야 하는 모듈을 의미
  entry: {
    bundle: path.resolve(__dirname, '..', './src/index.tsx'),
  },

  output: {
    path: path.resolve(__dirname, '..', 'build'),
    filename: '[name][contenthash].js',
    clean: true,
    assetModuleFilename: '[name][ext]',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'], // 나열한 확장자를 순서대로 해석, import 할 때 확장자 생략 가능
    alias: {
      '@': path.resolve(__dirname, '..', 'src'),
    },
  },

  cache: {
    type: 'filesystem',
  },

  stats: 'errors-warnings',

  module: {
    // loaders
    rules: [
      {
        test: /\.(ts|js)x?$/,
        include: path.resolve(__dirname, '..', 'src'),
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'es2015',
        },
      },
      {
        test: /\.(css|scss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]',
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },

  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2015',
        css: true,
      }),
    ],
    splitChunks: {
      chunks: 'all',
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      favicon: "src/assets/images/favicon_bbgg.ico",
      template: path.resolve(__dirname, '..', './public/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
      chunkFilename: '[name].css',
    }),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ],
};
