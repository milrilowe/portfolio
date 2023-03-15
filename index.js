require("dotenv").config();
const express = require("express");
const path = require('path');

const db = require('./db');

const logger = require('./middleware/logger');
const cookieParser = require('./middleware/cookieParser');
const identifier = require('./middleware/identifier');
const routes = require('./routes/index.js');

const app = express();
const spotifyAPI = express();

// Middleware
app.use(express.json());
app.use(logger);
app.use(cookieParser);
app.use(identifier);

// Routes
app.use('/', routes);
app.use(express.static('public'));
app.use('/guitar-piano', express.static(path.join(__dirname, 'guitar-piano', 'build')))

app.get('*', (req, res) => {
  res.status(404).sendFile('public/404.html', { root: __dirname });
});

const PORT = process.env.PORT;
const HOST = process.env.BASE_URL;
const ADDRESS = HOST + ':' + PORT;

app.listen(PORT, () => {
  console.log(`Listening at: ${ADDRESS}`);
});