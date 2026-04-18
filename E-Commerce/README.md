# 🛒 E-Commerce Backend (Node.js + Express + MongoDB)

A RESTful backend for an e-commerce application supporting authentication, product management, cart, wishlist, categories, and subcategories.

---

## 🚀 Features

- 👤 User Authentication (Register / Login / Profile)
- 🔐 JWT Authentication
- 🛡️ Role-based Access (Admin / User)
- 🛍️ Product Management (CRUD)
- 📦 Category Management
- 📦 SubCategory Management
- 🛒 Cart System (Add / Remove / Update)
- ❤️ Wishlist System
- 🗑️ Soft Delete System
- 📸 Image Upload using Multer

---

## 🏗️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (Authentication)
- bcrypt (Password hashing)
- Multer (File uploads)
- CORS

---

## 📁 Project Structure

app.js ├── package.json └── src/ ├── config/ ├── controller/ ├── model/ ├── routes/ └── middleware/

---

## ⚙️ Installation

git clone cd E-Commerce
npm install

## ▶️ Run Project

npm run dev

Server runs at: http://localhost:5550

## 🔐 Authentication

Authorization: Bearer

## 🌐 Base API

/api

## 📌 API Endpoints

👤 User

POST   /api/register

POST   /api/login

GET    /api/user/profile

📦 Category

POST     /api/category/add-category
GET      /api/category/get-categories
PUT      /api/category/update-category/:id
DELETE   /api/category/delete-category/:id

📂 SubCategory

POST    /api/subcategory/add-subcategory

GET     /api/subcategory/all-subcategories

PUT     /api/subcategory/update-subcategory/:id

DELETE  /api/subcategory/delete-subcategory/:id

🛍️ Products

POST    /api/product/add-product

GET     /api/product/all-products

PUT     /api/product/update-product/:id

DELETE  /api/product/delete-product/:id

GET     /api/product?category=&subCategory=

🛒 Cart

POST   /api/carts/add-cart

GET    /api/carts/get-cart

PUT    /api/carts/remove-cart

❤️ Wishlist

POST   /api/wishlist/add-wishlist

GET    /api/wishlist/get-wishlist

PUT    /api/wishlist/remove-wishlist

## 📌 Author

Backend built with Node.js + MongoDB