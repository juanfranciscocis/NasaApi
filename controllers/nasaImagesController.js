const nasaImagesService = require('../services/nasaImagesService');

exports.getImages = async function(req, res, next) {
    try {
        const query = req.body.query || null;

        console.log(query)

        // Call the NASA Images service
        const imagesData = await nasaImagesService.getImagesByQuery(query);

        // Format the response
        const items = (imagesData.collection && imagesData.collection.items) ? imagesData.collection.items.map(item => {
            const data = item.data && item.data[0] ? item.data[0] : {};
            const links = item.links || [];
            return {
                href: item.href,
                title: data.title,
                description: data.description,
                date_created: data.date_created,
                media_type: data.media_type,
                nasa_id: data.nasa_id,
                keywords: data.keywords,
                images: links.filter(link => link.render === 'image').map(link => ({
                    href: link.href,
                    rel: link.rel,
                    width: link.width,
                    height: link.height,
                    size: link.size
                })),
                preview: links.find(link => link.rel === 'preview' && link.render === 'image') || null
            };
        }) : [];

        res.send({ items });
    } catch (error) {
        console.error('Error in NASA Images controller:', error);
        next(error);
    }
};
