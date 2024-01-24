const express = require('express')
const {
  createProxyMiddleware
} = require('http-proxy-middleware');
const app = express()
const port = 9000


app.use('/api',
  createProxyMiddleware({
    target: 'https://discord.com/',
    changeOrigin: true,
  })
);

// app.use('/ws',
//   createProxyMiddleware({
//     target: 'ws://gateway.discord.gg',
//     ws:true,
//     changeOrigin: true,
//   })
// );
app.use(
  "/bing-speech",
  createProxyMiddleware({
    target: "wss://speech.platform.bing.com",
    changeOrigin: true,
    ws: true, // 开启WebSocket代理
    // secure: false, // 如果您的代理服务器不使用HTTPS，可以设置为false
    onProxyRes: function (proxyRes, req, res) {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*";
    },
  })
);
app.use('/mj', createProxyMiddleware({
  target: 'https://midjourney-proxy-production-qsx.up.railway.app',
  changeOrigin: true,
  onProxyRes: function (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
  }
}));

app.use('/mjdy', createProxyMiddleware({
  target: 'https://midjourney-proxy-production-5c01.up.railway.app',
  changeOrigin: true,
  onProxyRes: function (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
  }
}));


app.use('/', createProxyMiddleware({
  target: 'https://api.openai.com',
  changeOrigin: true,
  onProxyRes: function (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
  }
}));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
