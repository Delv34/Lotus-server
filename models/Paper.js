const {Schema, model} = require('mongoose')

const Paper = new Schema({
    date: {type: Date, required: true},
    name: {type: String, required: true},
    img: {type: String, required: true, unique: true},
    description: {type: String, required: true},
}) 

module.exports = model("Paper", Paper)