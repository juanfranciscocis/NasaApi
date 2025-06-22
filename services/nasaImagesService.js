// services/nasaService.js
const axios = require('axios');

const NASA_API_BASE_URL = process.env.NASA_IMAGES_API_URL
const NASA_API_KEY = process.env.NASA_API_KEY;
class NasaImagesService {
    async getImagesByQuery(query = 'Earth') {
        try {

            const params = {
                api_key: NASA_API_KEY
            };

            const response = await axios.get(
                `${NASA_API_BASE_URL}/search?q=${encodeURIComponent(query)}`,
            );

            return response.data;
        } catch (error) {
            console.error('Error fetching images by query:', error);
            throw error;
        }
    }

}

module.exports = new NasaImagesService();
