const Visit = require('../../db/models/Visit');
const Visitor = require('../../db/models/Visitor');

/**
 * Deletes visitor and their visits.
 * @param {Number} id of visitor to delete.
 * @returns
 */
exports.deleteVisitor = (id) => {
  return Visitor.delete({id: id})
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

/**
 * Returns every visit for particular visitor
 * @param {Number} id: id of visitor
 */
exports.getVisitsByVisitor = (id) => {
  Visit.find({id: id})
    .then((documents) => {
      return documents;
    })
    .catch((e) => {
      console.log(`Trouble fetching visits for visitor [${id}].`, e);
      throw new Error(`Trouble fetching visits for visitor [${id}].`);
    });
}