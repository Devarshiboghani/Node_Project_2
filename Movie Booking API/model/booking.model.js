const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    showId: {
        type: Schema.Types.ObjectId,
        ref: 'Shows',
        required: true
    },
    seats: {
        type: [String],
        default: []
    },
    totalAmount: {
        type: Number,
        min: 0,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
})


const Bookings = mongoose.model("Bookings", bookingSchema);

module.exports = Bookings;