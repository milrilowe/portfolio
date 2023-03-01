const express = require('express');
const router = express.Router();
const axios = require('axios');

// const click = require('./routes/click');
const visitor = require('./visitor');
const visit = require('./visit');

// Router delegates to other routers as middleware
router.use('/visitor', visitor);
router.use('/visit', visit);

module.exports = router;