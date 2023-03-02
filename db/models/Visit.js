const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  date: Date,
  id: String,
  timeSpentSite: Number,
  timeSpentResume: Number,
  discoverSpotifyGitHub: Boolean,
  atelierWebstoreGitHub: Boolean,
  addressBookGitHub: Boolean,
  chipotleScheduleGitHub: Boolean,
  guitarPianoGitHub: Boolean,
  yuumiBotGitHub: Boolean,
});

const Visit = mongoose.model('Visit', visitSchema);

module.exports = Visit;