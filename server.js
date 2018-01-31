const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { db, server } = require('./config');
const accessControl = require('./middlewares/access-control.middleware');
const controllers = require('./controllers');

const app = express();
const { host, port, database } = db.mongo;

mongoose.connect(`mongodb://${host}:${port}/${database}`);

app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(accessControl);
app.use(server.baseUrl, controllers);

app.listen(server.port, function() {
  console.log(`Server listening at port: ${server.port}`);
})
