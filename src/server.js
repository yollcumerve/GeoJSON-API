const app = require('express')()
require('dotenv').config({ debug: true})
const cors = require('cors')
const { json,urlencoded } = require('express')
const PORT = process.env.PORT || 8081
const morgan = require('morgan')
const globalErrorHandler = require('./controller/globalErrorHandler.js')
const AppError = require('./utils/appError.js')

app.use(json({ limit: "100kb"}))
app.use(urlencoded({limit: "100kb", extended: true}))

//Morgan 
app.use(morgan("common"))

//Enable Cors 
app.use(cors())

//ROUTES 
app.use(require('./routes/_main.js'))

app.all('*', (req,res,next) => {
    next(new AppError(`This server can not find ${req.originalUrl}`,404))
})

app.use(globalErrorHandler)



app.listen(PORT, () => {
    console.log('-----------------')
    console.log(`BACKEND SERVER RUNNİNG PORT: ${PORT}`)
    console.log('-----------------')
})