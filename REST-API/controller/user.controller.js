const User = require('../model/user.model.js');
const multer = require("multer");

exports.getAllUsers = async (req, res) => {
    try {
        let { search, sortby, sortorder, perPage, pageNo } = req.query;

        let currentPage = parseInt(pageNo) || 1;
        let perPageCount = parseInt(perPage) || 5;
        let skipRecord = (currentPage - 1) * perPageCount;
        let filter = {};

        if (search) {
            filter = {
                $or: [
                    { Firstname: {$regex: search, $options: "i"} },
                    { Lastname: {$regex: search, $options: "i"} },
                    { gmail: {$regex: search, $options: "i"} },
                ],
            };
        }

        let sortOrder = sortorder == 'asc' ? {[`${sortby}`] : 1} : {[`${sortby}`] : -1}

        let totalCount = await User.countDocuments(filter);
        let result = await User.find(filter)
                                .sort(sortOrder)
                                .skip(skipRecord)
                                .limit(perPageCount);

        // let users = await User.find(filter).sort(sortOrder);
        return res.json({message: 'All Users Fetched',
            Data : {
                totalCount,
                totalPage: Math.ceil(totalCount / perPageCount),
                currentPage,
                result,
        }
    });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error"});
    }
};

exports.getSingleUser = async(req, res) => {
    try {
        let user = await User.findById(req.params.id);
        return res.json(user);
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error"});
    }
};

exports.addNewUser = async (req, res) => {
    try {
        // console.log("Body: ", req.body);
        // console.log("File: ", req.file);
        let imagePath = "";
        if(req.file){
            imagePath = `/uploads/${req.file.filename}`;
        }
        
        let user = await User.create({
            ...req.body,
            profileImage: imagePath
        });
        return res.json({ message: "User Added Success", user});
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error"});
    }
};

exports.updateUser = async (req, res) => {
    try {
        let { id } = req.params;
        let user = await User.findById(id);
        if (!user) {
            return res.json({ message: "User not Found" });
        }

        let imagePath = user.profileImage;
        if(req.file){
            imagePath = `/uploads/${req.file.filename}`;
        }

        user = await User.findByIdAndUpdate(id, {
            ...req.body,
            profileImage: imagePath
        }, {new: true});
        return res.json({ message: "User Update", user});
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error"});
    }
};

exports.deleteUser = async (req, res) => {
    try {
        let { id } = req.params;
        let user = await User.findById(id);
        if (!user) {
            return res.json({ message: "User not Found" });
        }
        
        user = await User.findByIdAndDelete(id);
        res.json({ message: "User Delete", user});
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error" });
    }
};