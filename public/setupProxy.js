const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/post', {
            target: 'http://ec2-3-34-137-99.ap-northeast-2.compute.amazonaws.com',
            changeOrigin: true
        })
    )
    app.use(
        createProxyMiddleware('/auth', {
            target: 'http://ec2-3-34-137-99.ap-northeast-2.compute.amazonaws.com',
            changeOrigin: true
        })
    )
    app.use(
        createProxyMiddleware('/user', {
            target: 'http://ec2-3-34-137-99.ap-northeast-2.compute.amazonaws.com',
            changeOrigin: true
        })
    )
    app.use(
        createProxyMiddleware('/comment', {
            target: 'http://ec2-3-34-137-99.ap-northeast-2.compute.amazonaws.com',
            changeOrigin: true
        })
    )
    app.use(
        createProxyMiddleware('/like', {
            target: 'http://ec2-3-34-137-99.ap-northeast-2.compute.amazonaws.com',
            changeOrigin: true
        })
    )
};