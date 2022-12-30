const mongoose = require('mongoose')
require('dotenv').config()


mongoose.set('strictQuery', false)

mongoose.connect('mongodb://127.0.0.1/GeoJSONApi', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', ()=> {
    console.log('Connected')
})

module.exports = {
    mongoose, 
    db
}