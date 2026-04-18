const mongoose = require('mongoose');

// DB Connection
const dbConnect = () => {
    mongoose.connect("mongodb+srv://boghanidevarshi_db_user:DevarshiBoghani@cluster0.kq8nhm0.mongodb.net/Movie-booking-api")
    .then(() => console.log("DB Connect"))
    .catch(err => console.log(err));
}

module.exports = dbConnect;