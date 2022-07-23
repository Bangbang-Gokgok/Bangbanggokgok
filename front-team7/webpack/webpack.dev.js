const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    port: 3030, // 요청을 수신할 포트 번호를 지정하세요.
    proxy: {
      '/api': {
        target: 'http://localhost:5030',
        changeOrigin: true,
      },
      '/auth': {
        target: 'http://localhost:5030',
        changeOrigin: true,
      },
    },
    hot: true, // Webpack의 Hot Module Replacement 기능을 활성화합니다.
    open: true, // 서버가 시작된 후 브라우저를 열도록 dev-server에 지시합니다.
    compress: true, // 제공되는 모든 항목에 대해 gzip 압축을 활성화합니다.
    historyApiFallback: true, // HTML5 History API를 사용할 때, index.html 페이지는 404 응답 대신 제공되어야 합니다.
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
      // 'process.env.name': JSON.stringify('변수'), //env 변수 만들기
      'process.env.KAKAO_SEARCH_REST_API_KEY': JSON.stringify('515db7fd242436c113cc739b997d8e46'),
      'process.env.SERVER_PORT': JSON.stringify('http://localhost:5030'),
      'process.env.SERVER_URL': JSON.stringify('http://kdt-sw2-seoul-team07.elicecoding.com'),
    }),
  ],
};
