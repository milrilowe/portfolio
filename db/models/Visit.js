const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  date: Date,
  id: String,
  duration: String,
  resume: Number,
  discoverSpotifyGitHub: Number,
  atelierWebstoreGitHub: Number,
  addressBookGitHub: Number,
  chipotleScheduleGitHub: Number,
  guitarPianoGitHub: Number,
  yuumiBotGitHub: Number,
});

const Visit = mongoose.model('Visit', visitSchema);

module.exports = Visit;