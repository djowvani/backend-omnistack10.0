// Importing the Dev DataSchema
const Dev = require('../models/Dev')
// For array parsing into a string
const parseStringAsArray = require('../utils/parseStringAsArray');

// Controller's Functions - index, show, store, update, destroy
// index - list all records
// show - display only one record
// store - create record
// destroy - delete record

// Async function to search filter for the devs in a 10km range radius with desired techs
module.exports = {
    async index(request, response) {
        const { latitude, longitude, techs } = request.query;

        const techsArray = parseStringAsArray(techs);
        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });

        return response.json({ devs });
    }
}