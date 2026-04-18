const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const showSchema = mongoose.Schema({
    movieId: {
        type: Schema.Types.ObjectId,
        ref: 'Movies',
        required: true
    },
    screenId: {
        type: Schema.Types.ObjectId,
        ref: 'Screens',
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    ticketPrice: {
        type: Number,
        required: true
    },
    totalSeats: {
        type: Number,
        default: 60
    },
    reservedSeats: {
        type: [String],
        default: []
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
});
    

const Shows = mongoose.model("Shows", showSchema);

module.exports = Shows;