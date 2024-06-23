const express = require('express')
const cors = require('cors')
const mongoose = require("mongoose")
const authRouter = require('./routers/userRouter')
const productRouter = require('./routers/productRouter')
const PORT = process.env.PORT || 4444
require('dotenv').config()

const app = express()
const DATABASE_URL = process.env.DATABASE_URL

app.use(express.json())
app.use(cors())
app.use('/api', authRouter)
app.use('/api', productRouter)

const start = async ()=> {
    try {
        await mongoose.connect(DATABASE_URL) 
        app.listen(4444)
    } catch (error) {
        console.log(error)
    }
}

start()