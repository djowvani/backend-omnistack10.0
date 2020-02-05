// Lib to execute request to 3rd party APIs
const axios = require('axios');
// Importing the Dev DataSchema
const Dev = require('../models/Dev');
// Parsing array into string
const parseStringAsArray = require('../utils/parseStringAsArray');
// Methods to find websocket connections & send them messages
const { findConnections, sendMessage } = require('../websocket');

// Controller's Functions - index, show, store, update, destroy
// index - list all records
// show - display only one record
// store - create record
// destroy - delete record

// Functions to index & store devs 
module.exports = {
    async index(request, response) {
        const devs = await Dev.find();
        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        // Check for repeated data
        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            // 
            const apiResponse = await axios.get(`http://api.github.com/users/${github_username}`);
        
            const { name = login, avatar_url, bio } = (apiResponse.data);
        
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })

            // Filter connections that are under 10km radius
            // The new dev must have at least 1 of the filtered techs
            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }
        
        // Return a JSON response with the new dev's infos
        return response.json(dev);
    }
}