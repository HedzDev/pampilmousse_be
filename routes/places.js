var express = require('express');
var router = express.Router();
const { checkBody } = require('../modules/checkBody');

require('../models/connection');
const Place = require('../models/places');
const User = require('../models/users');

router.post('/newPlace', (req, res) => {
  const { name, description, tags, zipCode, imageSrc, imageAlt, href } =
    req.body;
  if (
    !checkBody(req.body, [
      'name',
      'tags',
      'zipCode',
      'imageSrc',
      'imageAlt',
      'href',
    ])
  ) {
    res.json({ result: false, error: 'Missing fields' });
    return;
  }

  User.findOne({ token: req.body.token }).then((data) => {
    const newPlace = new Place({
      name: name,
      description: description,
      tags: tags,
      zipCode: zipCode,
      imageSrc: imageSrc,
      imageAlt: imageAlt,
      href: href,
    });
    newPlace.save().then((placeData) => {
      res.json({ result: true, place: placeData });
    });
  });
});

router.get('/getPlaces', (req, res) => {
  Place.find().then((data) => {
    res.json({ result: true, places: data });
  });
});

router.get('/getPlacesByTags/:tag', (req, res) => {
  Place.findOne({ tag: req.params.tag }).then((data) => {
    res.json({ result: true, place: data });
  });
});

module.exports = router;
