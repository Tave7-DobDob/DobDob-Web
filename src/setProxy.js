const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/auth',
        createProxyMiddleware({
            target: 'http://localhost:8001/',
            changeOrigin: true,
        })
    );
   
    app.use(
        '/',
        createProxyMiddleware({
            target: 'https://kapi.kakao.com/',
            changeOrigin: true,
        })
    );
};
