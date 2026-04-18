const Product = require("../model/product.model");
const Cart = require("../model/cart.model");

exports.addToCart = async (req, res) => {
    try {
        let userId = req.user._id;

        let product = await Product.findById(req.body.productId);
        if (!product || product.isDelete == true) {
            return res.json({message: "Product is Not Found"});
        }
        let price = product.price;

        let cart = await Cart.findOne({userId: userId});

        if (!cart) {
            cart = await Cart.create({
                userId: userId,
                items: [
                    {
                        productId: req.body.productId,
                        quantity: req.body.quantity || 1,
                    },
                ],
                totalAmount: price * (req.body.quantity || 1),
            });
        } else {
            let cartItem = cart.items.find( (item) => 
                item.productId.toString() == req.body.productId,
            );
            if (!cartItem) {
                cart = await Cart.findOneAndUpdate(
                    {userId: userId},
                    {
                        $push: {
                            items: {
                                productId: req.body.productId,
                                quantity: req.body.quantity || 1,
                            },
                        },
                            $inc: {
                                totalAmount: price * (req.body.quantity || 1),
                            },
                    },
                    {
                        returnDocument: "after"
                    },
                );
            } else {
                cart = await Cart.findOneAndUpdate(
                    { userId: userId, "items.productId" : req.body.productId },
                    {
                        $inc: {
                            totalAmount: price * (req.body.quantity || 1),
                            "items.$.quantity": req.body.quantity || 1,
                        },
                    },
                    {
                        returnDocument: "after",
                    },
                );
            }
        }
        cart = await Cart.findOne({ userId }).populate({
            path: "items.productId",
            select: "title price productImages",
        });

        return res.json({message: "Cart Added", cart});
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: 'Server Error', error: error.message});
    }
}

exports.getAllCarts = async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.user._id }).populate({
            path: "items.productId",
            select: "title price productImages",
        });
        return res.json({message: "Cart Fetched", cart});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Server Error', error: error.message});
    }
}

exports.removeCart = async (req, res) => {
    try {
        let userId = req.user._id;
        let productId = req.query.productId;

        let cart = await Cart.findOne({ userId: userId }).populate({
            path: "items.productId",
            select: "title price",
        });

        if (!cart) {
            return res.json({ message: 'Cart is not Found' });
        }

        let removeItem = cart.items.find(item =>
            item.productId._id.toString() == productId
        );

        if (!removeItem) {
            return res.json({ message: 'Item is not Found' });
        }

        let removeAmount = removeItem.quantity * removeItem.productId.price;

        await Cart.findOneAndUpdate(
            { userId: userId },
            {
                $inc: { totalAmount: -removeAmount },
                $pull: { items: { productId: productId } }
            },
            { returnDocument: "after" }
        );

        cart = await Cart.findOne({ userId }).populate({
            path: "items.productId",
            select: "title price"
        });

        return res.json({ message: "Cart Item Removed", cart });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server Error', error: err.message });
    }
};