const express = require("express");
const { homepage, addNewbook, deleteBook, editBook, updateBook } = require("../controller/book.controller");
const uploadImage = require("../middleware/uploadImage");

const routes = express.Router();

routes.get("/", homepage);

routes.post("/add-book", uploadImage.single("Image"), addNewbook);

routes.get("/edit-book/:id", editBook);

routes.get("/delete-book/:id", deleteBook);

routes.post("/update-book/:id", uploadImage.single('Image'), updateBook);

module.exports = routes;