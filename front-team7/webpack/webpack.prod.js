const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

module.exports = new SpeedMeasurePlugin().wrap({
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env.name': JSON.stringify('Codevolution'), //env 변수 만들기
    // }),
    new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
  ],
});
