const express = require('express')
const cors = require('cors')
const mongoose = require("mongoose")
const authRouter = require('./routers/userRouter')
const productRouter = require('./routers/productRouter')
const PORT = process.env.PORT || 4444

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api', authRouter)
app.use('/api', productRouter)

const start = async ()=> {
    try {
        await mongoose.connect("mongodb+srv://admin:admin@lotus.lvynxvg.mongodb.net/Lotus?retryWrites=true&w=majority&appName=Lotus") 
        app.listen(4444)
    } catch (error) {
        console.log(error)
    }
}

start()