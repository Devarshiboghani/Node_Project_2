const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema({
    subCategoryName: {
        type: String,
        required: true,
        trim: true
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },

    isDelete : {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
})

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

module.exports = SubCategory;