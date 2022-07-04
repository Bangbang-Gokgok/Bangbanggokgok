const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
console.log('??? : ', process.env.SERVER_PORT);
module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    port: 3000, // 요청을 수신할 포트 번호를 지정하세요.
    hot: true, // Webpack의 Hot Module Replacement 기능을 활성화합니다.
    open: true, // 서버가 시작된 후 브라우저를 열도록 dev-server에 지시합니다.
    compress: true, // 제공되는 모든 항목에 대해 gzip 압축을 활성화합니다.
    historyApiFallback: true, // HTML5 History API를 사용할 때, index.html 페이지는 404 응답 대신 제공되어야 합니다.
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
      // 'process.env.name': JSON.stringify('변수'), //env 변수 만들기
      'process.env.SERVER_PORT': JSON.stringify(process.env.SERVER_PORT),
    }),

    new webpack.EnvironmentPlugin(['SERVER_PORT']),
  ],
};
