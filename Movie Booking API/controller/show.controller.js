const Show = require("../model/show.model");
const Movie = require("../model/movie.model");

exports.createShow = async (req, res) => {
    try {
        let { movieId, screenId, startTime, endTime, ticketPrice, totalSeats } = req.body;

        if (!movieId || !screenId || !startTime || !endTime || !ticketPrice) {
            return res.json({ message: "All fields are required" });
        }

        let movie = await Movie.findById(movieId);
        if (!movie || movie.isDeleted) {
            return res.status(404).json({ message: "Movie not found" });
        }

        let show = await Show.create({ movieId, screenId, startTime, endTime, ticketPrice, totalSeats });

        return res.json({ message: "Show created successfully", show });

    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};


exports.getAllShows = async (req, res) => {
    try {
        let shows = await Show.find({ isDeleted: false })
            .populate("movieId");

        return res.json({ message: "Shows fetched successfully", shows });

    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};


exports.getShowsByMovie = async (req, res) => {
    try {
        let shows = await Show.find({
            movieId: req.params.movieId,
            isDeleted: false
        }).populate("movieId");

        return res.json({ message: "Shows fetched for movie", shows });

    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};


exports.getShowById = async (req, res) => {
    try {
        let show = await Show.findById(req.params.id)
            .populate("movieId");

        if (!show || show.isDeleted) {
            return res.status(404).json({ message: "Show not found" });
        }

        return res.status(200).json({ message: "Show fetched successfully" ,show });

    } catch (error) {
        return res.status(500).json({ message: "Server error while fetching show",error: error.message });
    }
};


exports.updateShow = async (req, res) => {
    try {
        let show = await Show.findById(req.params.id);

        if (!show || show.isDeleted) {
            return res.status(404).json({ message: "Show not found" });
        }

        Object.assign(show, req.body);
        await show.save();

        return res.json({ message: "Show updated successfully", show });

    } catch (error) {
        return res.status(500).json({ message: "Server error while updating show", error: error.message });
    }
};


exports.deleteShow = async (req, res) => {
    try {
        let show = await Show.findById(req.params.id);

        if (!show || show.isDeleted) {
            return res.status(404).json({ message: "Show not found" });
        }

        show.isDeleted = true;
        await show.save();

        return res.json({ message: "Show deleted successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Server error while deleting show", error: error.message });
    }
};