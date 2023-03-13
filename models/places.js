const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
  name: String,
  description: String,
  tags: [String],
  zipCode: Number,
  imageSrc: String,
  imageAlt: String,
  href: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
