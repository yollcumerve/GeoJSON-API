const mongoose = require('mongoose')
const geocoder = require('../utils/geocoder')
const dbConnection = require('../module/dbConnection')
const StoreSchema = new mongoose.Schema({
    storeId: {
        type: String,
        required: [true, 'Please add a store Id'],
        unique: true,
        trim: true,
        maxlength: [10, 'StoreId must be less than 10 chars']

    },
    adress: {
        type: String,
        required: [true, 'Please add an adress']
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
           
        },
        coordinates: {
            type: [Number],
           
        },
        formattedAdress: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

// GEOCODE & CREATE LOCATION
StoreSchema.pre('save', async function(next){
    const loc = await geocoder.geocode(this.adress)
   this.location = {
    type:'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAdress: loc[0].formattedAddress
   }

   // Do not save adress
   this.adress = undefined
   next()
})

module.exports = mongoose.model('Store', StoreSchema)