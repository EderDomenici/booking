const express = require('express');
const adminController = require('../controller/adminController');

const routes = express.Router();

routes.get('/index', adminController.index)

routes.post('/login', adminController.login)

routes.post('/create', adminController.createAdm)

routes.put('/updatePassword', adminController.updatePassword)

module.exports = routes