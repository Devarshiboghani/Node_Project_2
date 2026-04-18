const Wishlist = require("../model/wishlist.model");
const Product = require("../model/product.model");

exports.addToWishlist = async (req, res) => {
    try {
        let userId = req.user._id;
        
        let product = await Product.findById(req.body.productId);
        if(!product || product.isDelete == true) {
            return res.json({message: "Product is Not Found"});
        }

        let wishlist = await Wishlist.findOne({ userId: userId});

        if (!wishlist) {
            wishlist = await Wishlist.create({
                userId: userId,
                items: [
                    {
                        productId: req.body.productId,
                    }
                ]
            });
        } else {
            let exist = wishlist.items.find( (item) => 
                item.productId.toString() == req.body.productId
            );

            if(exist) {
                return res.json({message: "Already in wishlist"});
            }

            wishlist = await Wishlist.findOneAndUpdate({ userId: userId},
                {
                    $push: { items: { productId: req.body.productId } }
                },
                { new: true }
            );
        }
        return res.json({message: "Addedto wishlist", wishlist});

    } catch (err) {
        console.log(err);
        return res.status(500).json({message: 'Server Error', error: err.message});
    }
}

exports.getWishlist = async (req, res) => {
    try {
        let wishlist = await Wishlist.findOne({userId: req.user._id})
        .populate("items.productId", "title price productImages");

        return res.json({message: "Wishlist fetched", wishlist});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Server Error", error: error.message});
    }
}

exports.removeFromWishlist = async (req, res) => {
    try {
        let userId = req.user._id;

        let wishlist = await Wishlist.findOneAndUpdate({ userId: userId },
            {
                $pull: {
                    items: {
                        productId: req.body.productId
                    }
                }
            },
            { returnDocument: "after" }
        );

        return res.json({message: "Removed from wishlist", wishlist });

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Server Error", error: error.message});
    }
}