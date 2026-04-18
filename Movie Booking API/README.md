# 🎬 Movie Booking API (Node.js + Express + MongoDB)

This is a Movie Ticket Booking backend API built using Node.js, Express, and MongoDB.

---

## 🚀 Features

- 👤 User Authentication (Register/Login)
- 🎬 Movie Management (CRUD)
- 🕒 Show Management
- 💺 Screen Management
- 🎟️ Seat Booking System
- ❌ Cancel Booking (Seat Release)
- 🔐 Role-based Access (Admin/User)
- 📦 MongoDB with Mongoose

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer (File Upload)

---

## 📂 Project Structure
Movie Booking API/ ├── app.js ├── package.json └── src/ ├── config/ ├── controller/ ├── model/ ├── routes/ ├── middleware/ └── uploads/


---

## ⚙️ Installation

git clone cd movie-booking-api
npm install

---

## ▶️ Run Project

npm run dev

Server runs at: http://localhost:8080

## 🔑 Authentication

Authorization: Bearer

## 📌 API Endpoints

👤 Auth

POST   /api/auth/register

POST   /api/auth/login

🎬 Movies

POST   /api/movies/add-movie

GET    /api/movies

GET    /api/movies/:id

PUT    /api/movies/:id

DELETE /api/movies/:id

🕒 Shows

POST   /api/shows/create-show

GET    /api/shows

💺 Booking

POST   /api/bookings

GET    /api/bookings/my-booking

PUT    /api/bookings/cancel/:id

## 👨‍💻 Author
Built with Node.js + MongoDB