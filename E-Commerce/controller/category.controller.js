const Category = require("../model/category.model");

exports.addCategory = async (req, res) => {
    try {
        let category = await Category.findOne({categoryName: req.body.categoryName, isDelete: false});
        if(category){
            return res.json({message: 'Category already exist'});
        }

        let imagepath = "";
        if(req.file) {
            imagepath = `/uploads/${req.file.filename}`;
        }
        category = await Category.create({
            ...req.body,
            categoryImage: imagepath
        })

        return res.json({message: 'Category Added', category});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Server Error'});
    }
}

exports.getAllCategories = async (req, res) => {
    try {

        let categories = await Category.aggregate([
            {
                $match: { isDelete: false }
            },
            {
                $lookup: {
                    from: "subcategories",
                    localField: "_id",
                    foreignField: "category",
                    as: "subcategories"
                }
            },
            {
                $project: {
                    _id: 1,
                    categoryName: 1,
                    categoryImage: 1,
                    subcategories: {
                        _id: 1,
                        subCategoryName: 1,
                    },
                },
            },
        ]);

        return res.json({message: 'Category Fetched', categories});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Server Error'});
    }
}

exports.updateCategory = async (req, res) => {
    try {
        let category = await Category.findById(req.params.id);

        if(!category) {
            return res.status(404).json({message: "Category not found"});
        }

        let image = category.categoryImage;

        if(req.file) {
            image = `/uploads/${req.file.filename}`;
        }

        category = await Category.findByIdAndUpdate(req.params.id, {
            categoryName: req.body.categoryName,
            categoryImage: image
        }, {new: true});

        res.json({message: "Category updated", category});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Server Error'});
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndUpdate(req.params.id, {isDelete: true});

        res.json({message: "Category deleted"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Server Error'});
    }
}

exports.getSingleCategory = async (req, res) => {
    try {
        let category = await Category.findOne({
            _id: req.params.id,
            isDelete: false
        });

        if (!category) {
            return res.status(404).json({message: "Category not found"});
        }

        return res.json({message: "Single Category Fetch", category});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Server Error'});
    }
}