const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    genre: {
        type: [String],
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    posterImage: {
        type: String,
        required: true,
        unique: true
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
})


const Movie = mongoose.model("Movies", movieSchema);

module.exports = Movie;