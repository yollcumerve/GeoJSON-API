const Store = require('../model/storeModel')
const factory = require('./factoryHandler')
const geocoder = require('../utils/geocoder')
const catchAsync = require('../utils/catchAsync')
exports.all = factory.getAll(Store)
exports.add = factory.createone(Store)
exports.one = factory.getOne(Store)


// @desc  Get stores within a radius
// @route GET  /radius/:zipcode/:distance
exports.getsInRadius =catchAsync( async (req,res,next) => {
    const {zipcode , distance} = req.params

    //Get lat/lang from geocoder
    const loc = await geocoder.geocode(zipcode)
    const lat = loc[0].latitude
    const lng = lng[0].longitude

    //Calculate radius using radians
    // Divide dist by radius of earth
    // Earth Radius = 3.963 mi / 6,378 km
    const radius = distance / 3963

    const stores = await Store.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lng, lat], radius]}}
    })
    res.status(200).json({
        success: true,
        count: stores.length,
        data: stores
    })
})