const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
    fullName:String,
    email:String,
    password:String,
    agree:String
})

const signupModel = mongoose.model("signups",signupSchema)
module.exports = signupModel;