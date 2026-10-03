// API => Application Programming Interface
// API sirf ak URL hai
// API frontend or server k beech communication karne ka kaam karta hai

// Use : Node.js me API server or client k beech data exchange k liye use hota hai
// Example : Node.js me ak REST API bana sakte hai jo browser ya mobile app se request leta hai or data response bhejta hai 


// API kyu jaruri hai?
// Frontend or Backend ko jodta hai
// Mobile app or web app dono use kar sakte hai
// Data sharing aasan banata hai
// Scalable or reusable hota hai


// How many type of API?
// => API ko 2 type se classify kiya jata hai
// 1. Access Level ke basis par => private api, public api, partner api, comosite api
// 2.Protocol / Architecture ke basis par => Rest API, Soap API, GraphiQL API, WebSocket API


// Types of API : REST APIs, SOAP APIs, GraphQL APIs, WebSocket APIs

// (1) REST API (Representational State Transfer API)
// => Rest API ak Architecture style hai jo http method ka use karke client or server ke beech communication karta hai.
// => REST API Methods => Uses HTTP methods like GET, POST, PUT, PATCH, DELETE.
// => Data ko JSON format me return karta hai
// => Most common type in Node.js applications.
// => isska use frontend and server ko connect karne k liye hota hai.

// (2) SOAP API (Simple Object Access Protocol)
// => XML-based protocol.
// => Mostly used in enterprise applications.
// => More rigid structure, supports built-in security.

// (3) GraphQL API
// => Client jitna data chahta hai utna hi request karta hai
// => Single endpoint hota hai
// => jab frontend ko specific data chahiye

// (4) WebSocket API (Real-time API)
// => Real-time communication k liye
// => Server or client dono ak-dusre ko data bhej sakte hai
// Example Use : Chat apps, Live notification


// Short Summary
// (1) REST API → सबसे common
// (2) GraphQL → Flexible data fetching
// (3) WebSocket → Real-time apps
// (4) External API → बाहर की services से data
// (5) Internal API → app के अंदर communication


// API kese kam karta hai?
// 1. Client Request bhejta hai
// 2. API Request ko handle karta hai
// 3. Server Data fetch karta hai
// 4. Response wapas bhejta hai(JSON format me data return hota hai)


// API ke Main Components :

// 1. Endpoint
// => API ka URL
// => Example : /api/users

// 2. Methods (HTTP Methods)
// GET : Retrive data (data lena)
// POST : Create data (data bhejna)
// PUT : Replace data (Data Update karna)
// PATCH : Update data
// DELETE : Delete data (data hatana)

// 3. Request
// Client dwara bheji gyi jankari
// isme headers, body, params hote hai

// 4. Response
// Server dwara bheja gaya data
// Mostly JSON formate me


// Different Methods Example : 
// bina mongoose connect kiye

const express = require('express');
const server = express();       // server ya app koi bhi variable le sakte hai

server.get('/', (req, res) => {
    res.end("Hello API");   // end ya send method bhi chalta hai
});

server.post('/', (req, res) => {
    res.end("POST Method")
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

server.listen(3000, () => {
    console.log('Server start at http://127.0.0.1:3000');
});


// What is different between update and replace?
// => replace poora data ko replace karta hai.
// => update sirf specific fildes ko update karta hai.


// What is different between patch and put method?
// => PUT : Poora data replace karta hai.
// => PATCH : Sirf required fildes ko update karta hai.


// Difference between Put and Patch Method

// | Feature      | PUT                  | PATCH              |
// | ------------ | -------------------- | ------------------ |
// | Update type  | Full update          | Partial update     |
// | Data replace | पूरा replace करता है | सिर्फ field update |
// | Risk         | Data loss हो सकता है | Safe होता है       |
// | Use case     | पूरा object update   | थोड़ा change करना  |

// 1. PUT Method (Full Update)
// 👉 PUT पूरा resource (data) को replace करता है

// Example : JSON

// मान लो आपका user है:
// {
//   "id": 1,
//   "name": "Rahul",
//   "age": 25
// }

// 👉 अगर आप PUT request भेजते हो:
// {
//   "name": "Amit"
// }

// 👉 Result होगा:
// {
//   "name": "Amit"
// }
// ❌ age delete हो जाएगा (क्योंकि पूरा data replace हुआ)


// 2. PATCH Method (Partial Update) 
// 👉 PATCH सिर्फ specific fields update करता है
//  Example : JSON 
// Same user:
// {
//   "id": 1,
//   "name": "Rahul",
//   "age": 25
// }

// 👉 PATCH request:
// {
//   "name": "Amit"
// }

// 👉 Result:
// {
//   "id": 1,
//   "name": "Amit",
//   "age": 25
// }
// ✅ बाकी data safe रहता है


// What is Schema?
// Schema = Data ka Structure jo model ko batata hai ki input or output kesa hoga (Type batata hai)
// Example :
// import mongoose from 'mongoose';
// const { Schema } = mongoose;

// const blogSchema = new Schema({
//   title: String, // String is shorthand for {type: String}
//   author: String,
//   body: String,
//   comments: [{ body: String, date: Date }],
//   date: { type: Date, default: Date.now },
//   hidden: Boolean,
//   meta: {
//     votes: Number,
//     favs: Number
//   }
// });


// CRUD => Create Retrive Update Delete