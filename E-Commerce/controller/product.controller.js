const Product = require("../model/product.model");
const SubCategory = require("../model/subCategory.model");
const fs = require("fs");
const path = require("path");

exports.addProduct = async (req, res) => {
    try {
        let product = await Product.findOne({title: req.body.title,isDelete: false,});

        if (product) {
            return res.json({message: "Product Already Exist"});
        }

        let imagePath = [];
        if (req.files) {
            imagePath = req.files.map(file => `/uploads/${file.filename}`);
        }

        product = await Product.create({
            ...req.body,
            productImages: imagePath,
        });
        return res.json({message: "Product Added", product});
        
    } catch (error) {
        console.log(error);
        return res.json({message: 'Server Error', error: error.message});
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        let products = await Product.find({isDelete: false})
            .populate("category", "categoryName")
            .populate("subCategory", "subCategoryName");

        return res.json({message: "All Products Fetched", products});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Server Error'});
    }
} 

exports.updateProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);

        if(!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        let images = product.productImages;

        if(req.files && req.files.length > 0) {

            // old image delete
            images.forEach(img => {
                let filePath = path.join(__dirname, "..", img);
                try {
                    fs.unlinkSync(filePath);
                } catch (err) {
                    console.log("Image not found");
                }
            });

            // new images
            images = req.files.map(file => `/uploads/${file.filename}`);
        }

        product = await Product.findByIdAndUpdate(
            req.params.id, 
            {
                ...req.body,
                productImages: images
        },
        {new: true}
    );

        return res.json({message: "Product Updated", product});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Server Error'});
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);

        if(!product) {
            return res.status(404).json({message: "Product not found"});
        }

        if (product.isDelete) {
            return res.json({message: "Product already deleted"});
        }

        // Delete images
       if (product.productImages && product.productImages.length > 0) {
         product.productImages.forEach(img => {
            let filePath = path.join(__dirname, "..", img);
            try {
                fs.unlinkSync(filePath);
            } catch (error) {
                console.log("Image not found");
            }
        });
       }

        // Soft delete
        product.isDelete = true;
        await product.save();

        return res.json({message: "Product deleted successfully"});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Server Error'});
    }
}


exports.getProduct = async (req, res) => {
    try {
        let filter = { isDelete: false };

        if (req.query.category) {
            filter.category = req.query.category;
        }

        if (req.query.subCategory) {
            filter.subCategory = req.query.subCategory;
        }

        let products = await Product.find(filter)
            .populate("category", "categoryName")
            .populate("subCategory", "subCategoryName");

        return res.json({
            message: "Filtered Products",
            products
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}