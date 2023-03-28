var express = require('express');
var router = express.Router();
const { checkBody } = require('../modules/checkBody');
const cloudinary = require('cloudinary').v2;
const uniqid = require('uniqid');
const fs = require('fs');

require('../models/connection');
const Place = require('../models/places');
const User = require('../models/users');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

router.post('/newPlace', (req, res) => {
  const {
    name,
    description,
    tags,
    zipCode,
    imageSrc,
    categories,
    imageAlt,
    href,
  } = req.body;
  if (!checkBody(req.body, ['name', 'tags', 'zipCode'])) {
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
      categories: categories,
    });
    newPlace.save().then((placeData) => {
      res.json({ result: true, place: placeData });
    });
  });
});

router.post('/upload', async (req, res) => {
  const picPath = `./tmp/${uniqid()}.jpg`;
  const resultMove = await req.files.picFromFront.mv(picPath);
  const resultCloudinary = await cloudinary.uploader.upload(picPath, {
    folder: 'places',
    use_filename: true,
    unique_filename: false,
  });

  fs.unlinkSync(picPath);

  if (!resultMove) {
    res.json({ result: true, url: resultCloudinary.secure_url });
  } else {
    res.json({ result: false, error: 'Something went wrong' + resultMove });
  }
});

router.get('/getPlaces', (req, res) => {
  Place.find().then((data) => {
    res.json({ result: true, places: data });
  });
});

module.exports = router;
