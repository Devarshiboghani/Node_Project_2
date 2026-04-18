const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    categoryName : {
        type: String,
        required: true,
        trim: true
    },

    categoryImage : {
        type: String
    },

    isDelete: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;