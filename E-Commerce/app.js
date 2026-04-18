const express = require('express');
const port = 5550;
const app = express();
const dbConnect = require('./config/dbConnection');
const cors = require('cors');

// db Connection
dbConnect();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true }));
app.use("/uploads", express.static("uploads"));

app.use("/api", require("./routes/index.routes"));

app.listen(port, () => {
    console.log(`Server Start at http://localhost:${port}`);
});