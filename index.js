require("dotenv").config();
const express = require("express");
const axios = require('axios');

const db = require('./db');

const logger = require('./middleware/logger');
const cookieParser = require('./middleware/cookieParser');
const identifier = require('./middleware/identifier');
const routes = require('./routes/index.js');

const app = express();

// Middleware
app.use(express.json());
app.use(logger);
app.use(cookieParser);
app.use(identifier);

// Routes
app.use('/', routes);
app.use(express.static('public'));

app.get('*', (req, res) => {
  res.status(404).sendFile('public/404.html', { root: __dirname });
});

const PORT = process.env.PORT;
const HOST = process.env.BASE_URL;
const ADDRESS = HOST + ':' + PORT;

app.listen(PORT, () => {
  console.log(`Listening at: ${ADDRESS}`);
});