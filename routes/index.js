const express = require('express');
const router = express.Router();

// const click = require('./routes/click');
const visitors = require('./visitors');
const visits = require('./visits');

// Router delegates to other routers as middleware
router.use('/visitors', visitors);
router.use('/visits', visits);

module.exports = router;