// To acess the Mongo database
const mongoose = require('mongoose');
// Importing PointSchema for 
const PointSchema = require('./utils/PointSchema');

// Creating the Dev DataSchema for storing into the MongoDB
const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
});

// Exporting
module.exports = mongoose.model('Dev', DevSchema);