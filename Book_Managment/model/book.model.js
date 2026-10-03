const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    Title: String,
    Description: String,
    Price: Number,
    category: String, 
    Image: String,
    isDelete: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;