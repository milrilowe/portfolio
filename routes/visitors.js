const express = require('express');
const axios = require('axios');
const router = express.Router();
const controller = require('../controllers/visitor.js');

/**
 * Gets current visitor
 */
router.get('/me', (req, res) => {
  const id = req.cookies.id;
  controller.getVisitor(id)
    .then((document) => {
      let {_id, __v, ...visitor} = document.toObject();
      res.send(visitor);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

/**
 * Gets all unique visitors
 */
router.get('/all', (req, res) => {
  controller.getAllVisitors()
    .then((documents) => {
      let visitors = [];

      for (document of documents) {
        let { _id, __v, ...visitor } = document.toObject();
        visitors.push(visitor);
      };

      res.send(visitors);
    })
    .catch((e) => {
      res.status(500).send(e);
    })
});

/**
 * Deletes current visitor
 */
router.delete('/', (req, res) => {
  controller.deleteVisitor()
    .then(() => {
      res.status(204).send();
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

module.exports = router;