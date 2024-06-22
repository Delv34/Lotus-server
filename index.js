const express = require('express')
const cors = require('cors')
const mongoose = require("mongoose")
const authRouter = require('./routers/userRouter')
const productRouter = require('./routers/productRouter')
const PORT = process.env.PORT || 5000
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())
app.use('/', authRouter)
app.use('/', productRouter)

const start = async ()=> {
    try {
        await mongoose.connect(process.env.DATABASE_URL) 
        app.listen(PORT, ()=> console.log("Сервер запущен на порту", PORT))
    } catch (error) {
        console.log(error)
    }
}

start()