const express = require('express');
const cottageController = require('../controller/cottageController');


const routes = express.Router();

routes.get('/index', cottageController.getCottages)

routes.post('/create', cottageController.createCottage)

routes.put('/update', cottageController.updateCottage)

routes.delete('/delete', cottageController.deleteCottage)


module.exports = routes