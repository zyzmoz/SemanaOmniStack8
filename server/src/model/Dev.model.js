const mongoose = require('mongoose');

const DevSchema = new mongoose.Schema({
  id: String,
  user: { type: String, required: true, unique: true },
  name: String,
  bio: String,
  avatar: String,  
}, {timestamps: true});

module.exports = mongoose.model('Dev', DevSchema);