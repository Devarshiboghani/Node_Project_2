const User = require("../model/user.model");
const { validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require("path");

exports.registerUser = async (req, res) => {
    try {
        let user = await User.findOne({email: req.body.email});
        if(user) {
            return res.json({message: 'User already exist'});
        }

        let imagepath = "";
        if(req.file) {
            imagepath = `/uploads/${req.file.filename}`;
        }
        let hashPassword = await bcrypt.hash(req.body.password, 10)

        user = await User.create({
            ...req.body,
            password: hashPassword,
            profileImage: imagepath
        });

        return res.status(201).json({message: 'User Register', user});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Server Error'});
    }
}

exports.loginUser = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email, isDelete : false});
        if(!user) {
            return res.json({message: "User is Not Found"});
        }

        let matchPassword = await bcrypt.compare(req.body.password, user.password);
        if(!matchPassword) {
            return res.json({message: 'Password is not matched'});
        }
        
        let token = jwt.sign({userId: user._id}, 'development')
        return res.status(200).json({message: 'Login Success', token});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Server Error'});
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        let users = await User.find({isDelete : false});
        return res.json({message: 'Fetch All Users', users});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Server Error'});
    }
}

exports.getProfile = async (req, res) => {
    try {
        let userId = req.query.userId ? req.query.userId : req.user._id;

        let user = await User.findById(userId);

        if(!user) {
            return res.json({message: "User Not Found"});
        }
        
        if(user.isDelete) {
            return res.json({message: 'User already deleted'});
        }
        return res.json({message: 'Fetch Profile', user});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Server Error'});

    }
}

exports.updateProfile = async(req, res) => {
    try {
        let user = req.user;
        let imagePath = user.profileImage;
        if(req.file) {
            imagePath = path.join(__dirname, "..", user.profileImage);
            try {
                await fs.unlinkSync(imagePath);
            } catch (error) {
                console.log('File Missing');
            }
            imagePath = `/uploads/${req.file.filename}`
        }
        user = await User.findByIdAndUpdate(user._id, {
            ...req.body,
            profileImage: imagePath
        }, {new: true})
        return res.json({message: 'User profile Update', user});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Server Error'});
    }
}

exports.deleteProfile = async (req, res) => {
    try {
        let user = req.user;
        user = await User.findByIdAndUpdate(user._id, {
            isDelete: true
        }, {new: true})
        return res.json({message: 'User Deleteed Successfully'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Server Error'});
    }
}