// models/teamModel.js
const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: String,
  sport: String,
  coach: String,
  country: String,
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
