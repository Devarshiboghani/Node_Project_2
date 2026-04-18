const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
    try {
        let { name, email, password, mobileNo } = req.body;

        if (!name || !email || !password) {
            return res.json({message: "Missing required fields"});
        }

        let existingUser = await User.findOne({ email, isDelete: false });
        if (existingUser) {
            return res.json({message: "User already exists"});
        }

        let hashPassword = await bcrypt.hash(password, 10);

        let user = await User.create({
            name,
            email,
            password: hashPassword,
            mobileNo,
            role: req.body.role || "user" 
        });

        return res.json({message: "User registered successfully", user})

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Server Error"});
    }
}

exports.loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.json({message: "Missing credentials"});
        }

        let user = await User.findOne({ email, isDelete: false });
        if (!user) {
            return res.json({message: "User not found"});
        }

        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({message: "Invalid credentials"});
        }

        let token = jwt.sign({userId: user._id}, 'development')
        return res.json({message: "Login Successful", token});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Server Error"});
    }
}

exports.getProfile = async (req, res) => {
    try {
        return res.json({user: req.user});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Server Error"});
    }
}

exports.logoutUser = async (req, res) => {
    try {
        
        return res.json({ message: "Logout successful (delete token from client)" });

    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
};