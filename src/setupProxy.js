const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.SERVER_PORT,
      changeOrigin: true,
    })
  );
  app.use(
    '/auth',
    createProxyMiddleware({
      target: process.env.SERVER_PORT,
      changeOrigin: true,
    })
  );
};
