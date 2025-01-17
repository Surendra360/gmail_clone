const mongoose = require("mongoose");
const plm = require("passport-local-mongoose")

const userSchema = new mongoose.Schema({
    name:String,
    username: String,
    email:String,
    phone:String,
    password:String
})

userSchema.plugin(plm)

module.exports = mongoose.model("user", userSchema)