const mongoose = require("mongoose");

const dbConnect = () => {
    mongoose.connect(process.env.MONGO_DB_URL)
    .then(() => console.log("DB Connect"))
    .catch((err) => console.log(err));
}

module.exports = dbConnect;