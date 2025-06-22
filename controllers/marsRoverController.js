const nasaService = require('../services/nasaService');

exports.getMarsRoverPhotos = async function(req, res, next) {
    try {
        // Get parameters from JSON body with defaults
        const rover = req.body.rover || 'curiosity';

        let camera = req.body.camera || null;
        if (camera === 'ALL') {
            camera = null;
        }

        const sol = req.body.sol || 1000;

        // Call the NASA service
        const roverData = await nasaService.getMarsRoverPhotos(rover, camera, sol);

        // Return results as JSON
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
        );
    } catch (error) {
        console.error('Error in Mars Rover controller:', error);
        next(error);
    }
};

