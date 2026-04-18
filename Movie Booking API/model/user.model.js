const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    mobileNo: {
        type: String
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
        required: true
    },
    isDelete: {
        type: Boolean,
        default: false
    }
}, {
    timestamps : true,
    versionKey : false
});

const users = mongoose.model("User", userSchema);

module.exports = users;