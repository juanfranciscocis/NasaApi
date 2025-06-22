const express = require('express');
const router = express.Router();
const marsRoverController = require('../controllers/marsRoverController');
const pictureOfTheDayController = require('../controllers/pictureOfTheDayController');
const nasaImagesController = require('../controllers/nasaImagesController');

router.post('/mars_rover', marsRoverController.getMarsRoverPhotos);

router.post('/picture_of_day', pictureOfTheDayController.getPictureOfTheDay);

router.post('/nasa_images' , nasaImagesController.getImages);

module.exports = router;
