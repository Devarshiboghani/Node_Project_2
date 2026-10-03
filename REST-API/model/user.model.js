const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    Firstname : String,
    Lastname : String,
    gmail : String,
    password : String,
    mobileNo : String,
    gender : {
        type : String,
        enum : ["Male", "Female"]
    },
    course : String,
    profileImage : String,
})

const User = mongoose.model("User", userSchema)

module.exports = User;