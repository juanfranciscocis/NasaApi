// services/nasaService.js
const axios = require('axios');

const NASA_API_BASE_URL = process.env.NASA_API_BASE_URL

const NASA_API_KEY = process.env.NASA_API_KEY;
class NasaService {
    async getMarsRoverPhotos(rover = 'curiosity', camera = null, sol = 1000, earthDate = null) {
        try {

            const params = {
                api_key: NASA_API_KEY
            };

            if (camera) params.camera = camera;
            if (earthDate) {
                params.earth_date = earthDate;
            } else {
                params.sol = sol;
            }

            const response = await axios.get(
                `${NASA_API_BASE_URL}/mars-photos/api/v1/rovers/${rover}/photos`,
                { params }
            );

            return response.data;
        } catch (error) {
            console.error('Error fetching Mars Rover photos:', error);
            throw error;
        }
    }

    async getAstronomyPictureOfDay(date = null) {
        try {
            const params = {
                api_key: NASA_API_KEY
            };

            if (date) params.date = date;

            const response = await axios.get(
                `${NASA_API_BASE_URL}/planetary/apod`,
                { params }
            );

            return response.data;
        } catch (error) {
            console.error('Error fetching Astronomy Picture of the Day:', error);
            throw error;
        }
    }





}

module.exports = new NasaService();
