const express = require('express');
const routes = require('./routes')
const app = express();
const port = process.env.PORT || 3001;
const { createProxyMiddleware } = require("http-proxy-middleware");

app.use('/', routes);

app.use(
    "/",
    createProxyMiddleware({
      changeOrigin: true,
      onProxyReq: function onProxyReq(proxyReq, req, res) {},
      pathRewrite: {
        "^/": "/",
      },
      target: "http://127.0.0.1:10800/",
      ws: true,
    })
  );

app.listen(port, () => {
    console.log(`server listen at port: ${port}`)
});