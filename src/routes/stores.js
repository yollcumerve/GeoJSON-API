const Router = require('express').Router()
const storeService = require('../service/storeService')

//Get all store
Router.get('/all/store', storeService.all)

//Add store 
Router.post('/add/store', storeService.add)

//Get one address by id
Router.get('/one/store/:id', storeService.one)

//get datas within a radius
Router.get('/radius/:zipcode/:distance', storeService.getsInRadius)

module.exports = Router