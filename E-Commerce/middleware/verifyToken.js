const jwt = require('jsonwebtoken');
const User = require("../model/user.model");

exports.verifyToken = async(req, res, next) => {
    try {
        let authorization = req.headers.authorization;
        if(!authorization) {
            return res.json({message: 'Token required'});
        }
        let token = authorization.split(" ")[1];
        let {userId} = jwt.verify(token, 'development');
        let user = await User.findById(userId);
        if(user){
            req.user = user;
            next();
        }else {
            return res.json({message: 'Invalid Token'});
        }
    } catch (error) {
        console.log(error);
        return res.json({ message: 'Token Expires or Invalid' });
    }
}

exports.verifyRole = (...roles) => {
    return (req, res, next) => {
        if(roles.includes(req.user.role)) {
            next();
        } else {
            return res.json({message: "Invalid role or insuffient permission"});
        }
    }
}