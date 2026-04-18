const express = require("express");
const port = 8080;
const app = express();
const dbConnect = require('./config/dbConnection');

// db Connection
dbConnect();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended : true }));
app.use("/uploads", express.static("uploads"));

// routes coneect
app.use("/api", require("./routes/index.routes"));

// Default route
app.get("/", (req, res) => {
    res.send("Movie Booking API Running");
})

app.listen(port, () => {
    console.log(`Server Start at http://localhost:${port}`);
});