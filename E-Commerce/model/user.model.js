const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    Firstname : String,
    Lastname : String,
    email : String,
    password : String,
    mobileNo : String,
    gender : {
        type : String,
        enum : ["Male", "Female"]
    },
    profileImage : String,
    role: {
        type : String,
        enum : ['admin', 'user'],
        default : 'user'
    },
    isDelete: {
        type : Boolean,
        default : false
    }
}, {
    timestamps : true,
    versionKey : false
});

const users = mongoose.model("User", userSchema)

module.exports = users;