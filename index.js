const express = require('express');
const routes = require('./routes')
const app = express();
const port = process.env.PORT || 3001;

app.use('/', routes);

app.listen(port, () => {
    console.log(`server listen at port: ${port}`)
});