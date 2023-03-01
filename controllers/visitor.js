const Visit = require('../db/models/Visit.js');
const Visitor = require('../db/models/Visitor.js');

/**
 * Returns all unique visitors
 * @returns all unique visitors
 */
exports.getAllVisitors = () => {
  return Visitor.find({})
    .then((documents) => {
      return documents;
    })
    .catch((e) => {
      console.log(`Trouble fetching all visitors.`, e);
      throw new Error(`Trouble fetching all visitors.`);
    });
}

/**
 * Returns visitor by id
 * @param {String} id: id of visitor to get
 * @returns visitor
 */
exports.getVisitor = (id) => {
  return Visitor.find({id: id})
    .then((documents) => {
      return documents[0];
    })
    .catch((e) => {
      console.log(`Trouble fetching visitor [${id}].`, e);
      throw new Error(`Trouble fetching visitor [${id}].`);
    });
}

/**
 * Deletes visitor and their visits.
 * @param {Number} id of visitor to delete.
 * @returns True if successful
 */
exports.deleteVisitor = (id) => {
  return Visitor.deleteOne({id: id})
    .then(() => {
      return Visit.deleteMany({id: id})
        .then(() => {
          return true;
        })
        .catch((e) => {
          console.log(`Trouble deleting visits for visitor [${id}].`, e);
          throw new Error(`Trouble deleting visits for visitor [${id}].`);
        });
    })
    .catch((e) => {
      console.log(`Trouble deleting visitor [${id}].`, e);
      throw new Error(`Trouble deleting visitor [${id}].`);
    });
}