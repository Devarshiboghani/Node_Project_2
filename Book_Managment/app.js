require("dotenv").config();
const express = require("express");
const dbConnect = require("./config/dbConnection");
// const morgan = require("morgan");
const port = process.env.PORT;
const app = express();


// dbConnection
dbConnect();


// middleware
// app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));


// EJS setup
app.set("view engine", "ejs");


// Routes
app.use("/", require("./routes/index.routes"))


app.listen(port, () => {
    console.log(`Server start at http://localhost:${port}`);
})