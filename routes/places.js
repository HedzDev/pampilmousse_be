var express = require('express');
var router = express.Router();

require('../models/connection');
const Place = require('../models/places');
const User = require('../models/users');

router.post('/newPlace', (req, res) => {
  const [name, description, friendlyCategories, location, image] = req.body;
  User.findOne({ token: req.body.token }).then((data) => {
    const newPlace = new Place({
      name: name,
      description: description,
      friendlyCategories: friendlyCategories,
      location: location,
      image: image,
      user: data._id,
    });
    newPlace.save().then((placeData) => {
      res.json({ result: true, place: placeData });
    });
  });
});

module.exports = router;
