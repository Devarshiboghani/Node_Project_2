const Screen = require("../model/screen.model");

exports.createScreen = async (req, res) => {
    try {
        let { screenName } = req.body;

        if (!screenName) {
            return res.json({ message: "Screen name is required" });
        }

        let existingScreen = await Screen.findOne({ screenName, isDeleted: false });

        if (existingScreen) {
            return res.json({ message: "Screen already exists" });
        }

        let screen = await Screen.create({ screenName });

        return res.json({ message: "Screen created successfully", screen });

    } catch (error) {
        return res.status(500).json({ message: "Server error while creating screen", error: error.message });
    }
};


exports.getAllScreens = async (req, res) => {
    try {
        let screens = await Screen.find({ isDeleted: false });

        return res.json({ message: "Screens fetched successfully", screens });

    } catch (error) {
        return res.status(500).json({ message: "Server error while fetching screens", error: error.message });
    }
};


exports.getScreenById = async (req, res) => {
    try {
        let screen = await Screen.findById(req.params.id);

        if (!screen || screen.isDeleted) {
            return res.status(404).json({ message: "Screen not found" });
        }

        return res.json({ message: "Screen fetched successfully", screen });

    } catch (error) {
        return res.status(500).json({ message: "Server error while fetching screen", error: error.message });
    }
};


exports.updateScreen = async (req, res) => {
    try {
        let screen = await Screen.findById(req.params.id);

        if (!screen || screen.isDeleted) {
            return res.status(404).json({ message: "Screen not found" });
        }

        Object.assign(screen, req.body);
        await screen.save();

        return res.json({ message: "Screen updated successfully", screen });

    } catch (error) {
        return res.status(500).json({ message: "Server error while updating screen", error: error.message });
    }
};


exports.deleteScreen = async (req, res) => {
    try {
        let screen = await Screen.findById(req.params.id);

        if (!screen || screen.isDeleted) {
            return res.status(404).json({ message: "Screen not found" });
        }

        screen.isDeleted = true;
        await screen.save();

        return res.status(200).json({ message: "Screen deleted successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Server error while deleting screen", error: error.message });
    }
};