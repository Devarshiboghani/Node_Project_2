const mongoose = require("mongoose");
const SubCategory = require("./subCategory.model");

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    quantity: {
        type: Number,
        required: true,
        min: 0
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },

    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
        required: true
    },

    productImages: {
        type: [String],
        default: []
    },

    isDelete: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;