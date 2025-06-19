const express = require('express');
const router = express.Router();
const nasaService = require('../services/nasaService');

/* GET Mars Rover photos */
router.get('/mars_rover', async function(req, res, next) {
    try {
        // Get query parameters with defaults
        const rover = req.query.rover || 'curiosity';
        const camera = req.query.camera || null;
        const sol = req.query.sol || 1000;

        // Call the NASA service
        const roverData = await nasaService.getMarsRoverPhotos(rover, camera, sol);

        //Return results as JSON
        res.send(
            roverData.photos.map(photo => ({
                id: photo.id,
                img_src: photo.img_src,
                earth_date: photo.earth_date,
                camera: {
                    id: photo.camera.id,
                    name: photo.camera.name,
                    full_name: photo.camera.full_name
                },
                rover: {
                    id: photo.rover.id,
                    name: photo.rover.name,
                    status: photo.rover.status
                }
            }))
        )

    } catch (error) {
        console.error('Error in Mars Rover route:', error);
        next(error);
    }
});

/* GET Astronomy Picture of the Day */
router.get('/picture_of_day', async function(req, res, next) {
    try {
        const date = req.query.date || null;
        const apodData = await nasaService.getAstronomyPictureOfDay(date);

        res.send(
            {
                title: apodData.title,
                date: apodData.date,
                explanation: apodData.explanation,
                url: apodData.url,
                media_type: apodData.media_type,
                hdurl: apodData.hdurl || null
            }
        )
    } catch (error) {
        console.error('Error in APOD route:', error);
        next(error);
    }
});

module.exports = router;
