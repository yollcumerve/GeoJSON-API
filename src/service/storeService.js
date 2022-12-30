const Store = require('../model/storeModel')
const factory = require('./factoryHandler')

exports.all = factory.getAll(Store)
exports.add = factory.createone(Store)
exports.one = factory.getOne(Store)