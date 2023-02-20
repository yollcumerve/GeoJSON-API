const mongoose = require('mongoose')
const geocoder = require('../utils/geocoder')
const dbConnection = require('../module/dbConnection')
const StoreSchema = new mongoose.Schema({
    storeName : {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    location: {
        //it has to have coordinates, type and coordinates are two required fields
        type: {
            type: String,
            enum: ['Point'],
           
        },
        coordinates: {
            type: [Number],
           index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

// GEOCODE & CREATE LOCATION
StoreSchema.pre('save', async function(next){
    const loc = await geocoder.geocode(this.address)
   this.location = {
    type:'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].street,
    city: loc[0].city,
    state: loc[0].state,
    zipcode: loc[0].zipcode,
    country: loc[0].country
   }

   // Do not save address in db
   this.address = undefined
   next()
})

module.exports = mongoose.model('Store', StoreSchema)