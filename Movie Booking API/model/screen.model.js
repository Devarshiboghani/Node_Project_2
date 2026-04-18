const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const screenSchema = mongoose.Schema({
    screenName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
})

const Screens = mongoose.model("Screens", screenSchema);

module.exports = Screens;