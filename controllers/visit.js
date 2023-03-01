const Visit = require('../db/models/Visit.js');
const Visitor = require('../db/models/Visitor.js');

/**
 * Creates a new visitor with first visit data
 * @param {Object} visit: first visit
 * @returns visitor
 */
const createVisitor = (visit) => {
  return {
    id: visit.id,
    duration: visit.duration,
    visits: 1,
    resume: visit.resume,
    discoverSpotifyGitHub: visit.discoverSpotifyGitHub,
    atelierWebstoreGitHub: visit.atelierWebstoreGitHub,
    addressBookGitHub: visit.addressBookGitHub,
    chipotleScheduleGitHub: visit.chipotleScheduleGitHub,
    guitarPianoGitHub: visit.guitarPianoGitHub,
    yuumiBotGitHub: visit.yuumiBotGitHub,
  };
}

/**
 * Updates visitor with visit data
 * @param {Object} visitor: visitor to update
 * @param {Object} visit: visit data
 */
const updateVisitor = (visitor, visit) => {

  const booleans = ['resume', 'discoverSpotifyGitHub', 'atelierWebstoreGitHub', 'addressBookGitHub', 'chipotleScheduleGitHub', 'guitarPianoGitHub', 'yuumiBotGitHub'];

  visitor.duration += visit.duration;
  visitor.visits += 1;

  for (boolean of booleans) {
    visitor[boolean] = visitor[boolean] ? true : visit[boolean];
  }

  return visitor;
}

/**
 * Returns all visits by all visitors
 */
exports.getAllVisits = () => {
  return Visit.find({})
    .then((documents) => {
      return documents;
    })
    .catch((e) => {
      console.log('Trouble fetching all visits.', e);
      throw new Error('Trouble fetching all visits.');
    });
};

/**
 * Returns every visit for particular visitor
 * @param {Number} id: id of visitor
 */
exports.getVisitsByVisitor = (id) => {
  return Visit.find({id: id})
    .then((documents) => {
      return documents;
    })
    .catch((e) => {
      console.log(`Trouble fetching visits for visitor [${id}].`, e);
      throw new Error(`Trouble fetching visits for visitor [${id}].`);
    });
}

/**
 * Adds a new visit
 * @param {Object} visit: data of visit
 * @returns: True if no errors
 */
exports.addVisit = (visit) => {
  return new Visit(visit).save()
    .then(() => {
      let filter = {id: visit.id};

      return Visitor.find(filter)
        .then((documents) => {
          if (documents.length > 0) {
            console.log(documents[0])
            let visitor = updateVisitor(documents[0], visit);

            return Visitor.findOneAndUpdate(filter, visitor)
              .then(() => {
                console.log(visitor)
                return true;
              })
              .catch((e) => {
                console.log(`Trouble updating visitor [${visitor.id}] with visit.`, e);
                throw new Error(`Trouble updating visitor [${visitor.id}] with visit.`);
              });
          } else {
            const visitor = createVisitor(visit);

            return new Visitor(visitor).save()
              .then(() => {
                return true;
              })
              .catch((e) => {
                console.log(`Trouble saving new visitor [${visitor.id}].`, e);
                throw new Error(`Trouble saving new visitor [${visitor.id}].`);
              });
          }
        })
        .catch((e) => {
          console.log(`Trouble syncing visit with visitor [${visitor.id}].`, e);
          throw new Error(`Trouble syncing visit with visitor [${visitor.id}].`);
        });
    })
    .catch((e) => {
      console.log('Trouble saving visit.', e);
      throw new Error('Trouble saving visit.');
    });
}