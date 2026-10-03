const express = require('express');
const mongoose = require('mongoose');
const server = express();         // server ya app koi bhi variable le sakte hai

// DB Connection
mongoose.connect("mongodb://localhost:27017/node9AM")
// mongoose.connect("mongodb://127.0.0.1:27017/data")       // data k badle kuchh bhi xyz likh sakte hai
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.log(err);
})

// middleware
server.use(express.json());

server.get("/get-users", async(req, res) => {
  console.log("Body: ", req.body);
  // let users = await User.find();
  // return res.json({message : 'All Users Fetched', users});
})

server.post('/add-user', async(req, res) => {
  let user = await User.create(req.body);
  return res.json({message: 'User Added Success', user});
})

server.put('/', (req, res) => {
  res.end("PUT Method")
})

server.patch('/', (req, res) => {
  res.end("PATCH Method")
})

server.delete('/', (req, res) => {
  res.end("DELETE Method")
})

server.listen(1234, () => {
  console.log('Server start at http://127.0.0.1:1234');
})