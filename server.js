const express = require('express');
const app = express();
port = 8080;
require('./models');
require('./models/usersTable');
const routerReg = require('./router/routes');
const bodyParser = require('body-parser');

app.use(
      bodyParser.urlencoded({
            extended: false,
      })
);


app.get('/', (req, res) => {
      res.send('Home page')
})

app.listen(port, () => {
      console.log(`app is listening at port ${port}`);
})

app.use(routerReg);