const { v4: uuidv4 } = require('uuid');

module.exports = (req, res, next) => {
  let uniqueId;

  if (!req.cookies.id) {
    uniqueId = uuidv4();
  } else {
    uniqueId = req.cookies.id;
  }

  res.cookie('id', uniqueId, {maxAge: 1000 * 60 * 60 * 24 * 60});

  next();
};