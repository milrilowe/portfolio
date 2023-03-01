const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  id: String,
  duration: Number,
  visits: Number,
  resume: Number,
  discoverSpotifyGitHub: Number,
  atelierWebstoreGitHub: Number,
  addressBookGitHub: Number,
  chipotleScheduleGitHub: Number,
  guitarPianoGitHub: Number,
  yuumiBotGitHub: Number,
});

const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;