const express = require('express');
const router = express.Router();
const controller = require('../controllers/visit.js');

/**
 * Gets all visits from database
 */
router.get('/all', (req, res) => {
  controller.getAllVisits()
    .then((documents) => {
      let visits = [];

      for (document of documents) {
        let { _id, __v, ...visit } = document.toObject();
        visits.push(visit);
      };

      res.send(visits);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

/**
 * Gets all visitor's visits
 */
router.get('/', (req, res) => {
  const id = req.cookies.id;

  controller.getVisitsByVisitor(id)
    .then((documents) => {
      let visits = [];

      for (document of documents) {
        let { _id, __v, ...visit } = document.toObject();
        visits.push(visit);
      };

      res.send(visits);
    })
    .catch((e) => {
      res.status(500).send(e);
    })
});

/**
 * Saves visit to database
 */
router.post('/', (req, res) => {
  const visit = { id: req.cookies.id, ...req.body };

  controller.addVisit(visit)
    .then(() => {
      res.status(201).send();
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

module.exports = router;