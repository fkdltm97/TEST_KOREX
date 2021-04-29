const {createProxyMiddleware } = require('http-proxy-middleware');

console.log('setUprpoxy js실행======================');

module.exports= function(app){
    app.use(
    createProxyMiddleware('/api',{
        target:'http://localhost:8080/',
        changeOrigin: true
    })
    );
};