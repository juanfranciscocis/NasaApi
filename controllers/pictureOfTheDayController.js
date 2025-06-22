const nasaService = require('../services/nasaService');

exports.getPictureOfTheDay = async function(req, res, next) {
    try {
        const date = req.body.date || null;
        const apodData = await nasaService.getAstronomyPictureOfDay(date);

        res.send({
            title: apodData.title,
            date: apodData.date,
            explanation: apodData.explanation,
            url: apodData.url,
            media_type: apodData.media_type,
            hdurl: apodData.hdurl || null
        });
    } catch (error) {
        console.error('Error in APOD controller:', error);
        next(error);
    }
};

