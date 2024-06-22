const {Schema, model} = require('mongoose')

const Product = new Schema({
    category: {type: String, required: true},
    name: {type: String, required: true, unique: true},
    price: {type: Number, required: true},
    images: [{type: String, required: true}],
    description: {type: String, required: true},
    weight: {type: Number, required: true},
    proteins: {type: Number, required: true},
    fats: {type: Number, required: true},
    carbonhydrates: {type: Number, required: true},
    calories: {type: Number, required: true},
    composition: {type: String, required: true},
    storage_conditions: {type: String, required: true},
    best_conditions: {type: String, required: true},
    filling: [{type: String, required: true}],
    kind: {type: String, required: true},
}) 

module.exports = model("Product", Product)