const Booking = require("../model/booking.model");
const Show = require("../model/show.model");

exports.createBooking = async (req, res) => {
    try {
        let userId = req.user._id;
        let { showId, seats } = req.body;

        if (!showId || !seats || seats.length === 0) {
            return res.json({ message: "ShowId and seats are required" });
        }

        let show = await Show.findById(showId);

        if (!show || show.isDeleted) {
            return res.status(404).json({ message: "Show not found" });
        }

        // check already booked seats
        let alreadyBooked = show.reservedSeats.filter(seat =>
            seats.includes(seat)
        );

        if (alreadyBooked.length > 0) {
            return res.json({ message: "Some seats already booked", seats: alreadyBooked });
        }

        let totalAmount = show.ticketPrice * seats.length;

        // update reserved seats in show
        show.reservedSeats.push(...seats);
        await show.save();

        let booking = await Booking.create({ userId, showId, seats, totalAmount, status: "confirmed" });

        return res.json({ message: "Booking successful", booking });

    } catch (error) {
        return res.status(500).json({ message: "Server error while creating booking", error: error.message });
    }
};

exports.getUserBookings = async (req, res) => {
    try {
        let userId = req.user._id;

        let bookings = await Booking.find({ userId })
            .populate({
                path: "showId",
                populate: {
                    path: "movieId"
                }
            });

        return res.json({ message: "User bookings fetched successfully", bookings });

    } catch (error) {
        return res.status(500).json({ message: "Server error while fetching bookings", error: error.message });
    }
};

exports.cancelBooking = async (req, res) => {
    try {
        let booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        let show = await Show.findById(booking.showId);

        if (!show) {
            return res.status(404).json({ message: "Show not found" });
        }

        // remove seats from reservedSeats
        show.reservedSeats = show.reservedSeats.filter(
            seat => !booking.seats.includes(seat)
        );

        await show.save();

        booking.status = "cancelled";
        await booking.save();

        return res.status(200).json({ message: "Booking cancelled successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Server error while cancelling booking" ,error: error.message });
    }
};
