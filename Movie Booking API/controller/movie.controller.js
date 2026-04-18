const Movie = require("../model/movie.model");
const fs = require("fs");

exports.addMovie = async (req, res) => {
    try {
         let movie = await Movie.findOne({
            isDeleted: false,
            title: req.body.title,
        })

        if (movie) return res.status(400).json({ message: "already exist..." });

        let imagePath = "";
        if (req.file) imagePath = `/uploads/${req.file.filename}`;

        movie = await Movie.create({
            ...req.body,
            posterImage: imagePath
        })

        return res.status(200).json({ message: "Successfully added...", data: movie });


    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};


exports.getAllMovies = async (req, res) => {
    try {
        let movies = await Movie.find({ isDeleted: false });

        return res.json({ movies });

    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};


exports.getMovieById = async (req, res) => {
    try {
        let movie = await Movie.findById(req.params.id);

        if (!movie || movie.isDeleted === true) {
            return res.status(404).json({ message: "Movie not found" });
        }

        return res.json({ movie });

    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};


exports.updateMovie = async (req, res) => {
    try {
        const { id } = req.params;

        const movie = await Movie.findOne({ _id: id, isDeleted: false });

        if (!movie) return res.status(404).json({ success: false, message: "not found..." });

        let imagePath = movie.posterImage;

        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        }

        const data = await Movie.findByIdAndUpdate(
            id,
            {
                ...req.body,
                posterImage: imagePath
            },
            { returnDocument: "after"  }
        );

        return res.status(200).json({ message: "Successfully updated...", data });

    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};


exports.deleteMovie = async (req, res) => {
    try {
        let movie = await Movie.findById(req.params.id);

        if (!movie || movie.isDeleted) {
            return res.status(404).json({ message: "Movie not found" });
        }

        movie.isDeleted = true;
        await movie.save();

        return res.json({ message: "Movie deleted successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};