require("dotenv").config();
const express = require("express");
const axios = require('axios');

const db = require('./db');

const cookieParser = require('./middleware/cookieParser');
const identifier = require('./middleware/identifier');
const routes = require('./routes/index.js');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser);
app.use(identifier);

// Routes
app.use('/', routes);
app.use(express.static('public'));

app.post('/test', (req, res) => {
  console.log(req.body);
  console.log(req.cookies);
  res.sendStatus(200);
})

const PORT = process.env.PORT;
const HOST = process.env.BASE_URL;
const ADDRESS = HOST + ':' + PORT;

app.listen(PORT, () => {
  console.log(`Listening at: ${ADDRESS}`);
});