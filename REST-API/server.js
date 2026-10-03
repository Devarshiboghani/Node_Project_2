const express = require("express");
const mongoose = require("mongoose");
const server = express();
const cors = require('cors');

// DB Connection
mongoose.connect("mongodb://127.0.0.1:27017/user")
.then(() => console.log("DB Connect"))
.catch(err => console.log(err));

// middleware
server.use(cors());
server.use(express.json());
server.use("/uploads", express.static('uploads'))

server.use("/", require("./routes/user.routes.js"));


server.listen(4000, () => {
    console.log("Server running http://localhost:4000");
});