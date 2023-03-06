const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
  name: String,
  description: String,
  friendlyCategories: {
    kid: Boolean,
    animals: Boolean,
    handicaped: Boolean,
  },
  location: {
    lat: Number,
    lng: Number,
  },
  image: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
