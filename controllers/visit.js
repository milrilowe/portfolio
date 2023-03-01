const Visit = require('../../db/models/Visit');
const Visitor = require('../../db/models/Visitor');

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

const updateVisitor = (visitor, visit) => {
  visitor.duration += visit.duration;
  visitor.visits += 1;
  visitor.resume = visit.resume;
  visitor.discoverSpotifyGitHub = visit.discoverSpotifyGitHub;
  visitor.atelierWebstoreGitHub = visit.atelierWebstoreGitHub;
  visitor.addressBookGitHub = visit.addressBookGitHub;
  visitor.chipotleScheduleGitHub = visit.chipotleScheduleGitHub;
  visitor.guitarPianoGitHub = visit.guitarPianoGitHub;
  visitor.yuumiBotGitHub = visit.yuumiBotGitHub;
}

/**
 * Returns all visits by all visitors
 */
exports.getAllVisits = () => {
  Visit.find({})
    .then((documents) => {
      return documents;
    })
    .catch((e) => {
      console.log('Trouble fetching all visits.', e);
      throw new Error('Trouble fetching all visits.');
    });
};

/**
 * Adds a new visit
 * @param {Object} visit: data of visit
 * @returns: True if no errors
 */
exports.addVisit = (visit) => {
  return new Visit({visit}).save()
    .then(() => {
      let filter = {id: visit.id};

      Visitor.find(filter)
        .then((documents) => {
          if (documents.length > 0) {
            let visitor = { ...documents[0] };

            updateVisitor(visitor, visit);

            Visitor.findOneAndUpdate(filter, visitor)
              .then(() => {
                return true;
              })
              .catch((e) => {
                console.log(`Trouble updating visitor [${visitor.id}] with visit.`, e);
                throw new Error(`Trouble updating visitor [${visitor.id}] with visit.`);
              })
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
    })
}

