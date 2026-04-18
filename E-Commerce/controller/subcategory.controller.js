const Category = require("../model/category.model");
const SubCategory = require("../model/subCategory.model");

exports.addSubCategory = async (req, res) => {
    try {
        let subcategory = await SubCategory.findOne({...req.body, isDelete: false});
        if(subcategory){
            return res.json({message: 'Subcategory already exist'});
        }

        subcategory = await SubCategory.create({...req.body});
        return res.json({message: 'SubCategory added', subcategory});

    } catch (error) {
        console.log(error);
        return res.json({message: 'Server Error'});
    }
}

exports.getAllSubCategories = async (req, res) => {
    try {
        let subcategories = await SubCategory.find({isDelete: false}).populate({path: 'category', select: 'categoryName'});
        return res.json({message: 'Fetch All SubCategory', subcategories});

    } catch (error) {
        console.log(error);
        return res.json({message: 'Server Error'});
    }
}

exports.updateSubCategory = async (req, res) => {
    try {
        let subcategory = await SubCategory.findById(req.params.id);

        if(!subcategory) {
            return res.status(404).json({message: "SubCategory not found"});
        }

        subcategory = await SubCategory.findByIdAndUpdate(req.params.id, {
            subCategoryName: req.body.subCategoryName,
            category: req.body.category
        }, {new: true});

        res.json({message: "SubCategory updated", subcategory});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Server Error'});
    }
}


exports.deleteSubCategory = async (req, res) => {
    try {
        await SubCategory.findByIdAndUpdate(req.params.id, {isDelete: true});

        res.json({message: "SubCategory deleted"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Server Error'});
    }
}


exports.getSubCategoryByCategory = async (req, res) => {
    try {
        let subcategories = await SubCategory.find({
            category: req.params.categoryId,
            isDelete: false
        });
        return res.json({message: "SubCategory by Category", subcategories});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Server Error'});
    }
}