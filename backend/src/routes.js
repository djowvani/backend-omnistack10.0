// Importing only the 'Router' from the Express framework
const { Router } = require('express')
// Data controllers
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

// Initializing the routes module
const routes = Router()

// The API's HTTP methods:
// GET - to acquire data
// POST - insert data
// PUT - edit data
// DELETE - remove data

// Parameter types:
// Query Params - request.query (specific searches, filter, ordening, pagination, ...)
// Route Params - request.params (identify a resource when altering or deleting it)
// Body - request.body (data to create or alter a registry)

// Application's endpoints for indexing devs, create new dev & techs search for finding devs
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.get('/search', SearchController.index);

// Exporting the routes so the index has access to it
module.exports = routes;