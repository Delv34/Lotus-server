const {Schema, model, default: mongoose} = require('mongoose')

const Category = new Schema({
    name: {type: String, unique: true, required: true},
    kind: [{type: String, required: true}],
    filling: [{type: String, required: true}],
    products: [{type: mongoose.Schema.Types.ObjectId, ref: "Product"}]
}) 

module.exports = model("Category", Category)