const {Schema, model, default: mongoose} = require('mongoose')

const User = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    fullname: {type: String},
    birthday: {type: Date},
    sex: {type: Boolean},
    phone: {type: String},
    adress: {type: String},
    favorites: [{type: mongoose.Schema.Types.ObjectId, ref: "Product"}],
    cart: [{type: mongoose.Schema.Types.ObjectId, ref: "Product"}],
    roles: [{type: String, ref: "Role"}]
}) 

module.exports = model("User", User)