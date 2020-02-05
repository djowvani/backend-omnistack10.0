// Defining / Importing the application's frameworks

// For routing / making endpoints
const express = require('express');
// For acessing the application's MongoDB database
const mongoose = require('mongoose');
// Importing the routes
const routes = require('./routes');
// For real-time updating of the application
const { setupWebsocket } = require('./websocket');
// For dealing with browser's CORS restrictions when using more than one resource
const cors = require('cors');
// Module to listen HTTP requests, imported to listen WebSockets fo real-time updating the application
const http = require('http');

// Initializing the application
const app = express();
const server = http.Server(app);

setupWebsocket(server);

// Connecting the application to the database
mongoose.connect('mongodb+srv://omnistack:omnistack@semanaomnistack-4rse8.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

// use() method configures all the routes
app.use(cors());
app.use(express.json());
app.use(routes);

// Defining the port for the appplication's server
server.listen(3333);