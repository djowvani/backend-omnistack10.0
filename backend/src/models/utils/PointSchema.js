// Import to MongoDB connect
const mongoose = require('mongoose');

// Creating the geolocation point DataSchema for storing into MongoDB
const PointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    },
})

// Exporting
module.exports = PointSchema;