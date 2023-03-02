const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  id: String,
  visits: Number,
  timeSpentSite: Number,
  timeSpentResume: Number,
  discoverSpotifyGitHub: Boolean,
  atelierWebstoreGitHub: Boolean,
  addressBookGitHub: Boolean,
  chipotleScheduleGitHub: Boolean,
  guitarPianoGitHub: Boolean,
  yuumiBotGitHub: Boolean,
});

const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;