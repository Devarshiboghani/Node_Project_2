const Book = require("../model/book.model");
const fs = require("fs");
const path = require("path");
const sendMail = require("../config/mailer");

// ================= HOME PAGE =================
exports.homepage = async (req, res) => {
    try {
        const books = await Book.find({ isDelete: false });
        return res.render("index", { books });
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
};

// ================= ADD BOOK =================
exports.addNewbook = async (req, res) => {
    try {
        let book = await Book.findOne({ Title: req.body.Title });

        if (book) {
            console.log("Book already exists");
            return res.redirect("/");
        }

        let imagepath = "";

        if (req.file) {
            imagepath = req.file.filename; // ✅ ONLY filename store
        }

        const newBook = await Book.create({
            ...req.body,
            Image: imagepath
        });

        await sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: "New Book Added 📚",
            text: ` Book Added Successfully!
            Title: ${newBook.Title}
            Category: ${newBook.category}
            Price: ₹${newBook.Price} `
        });

        console.log("📧 Email Sent");

    return res.redirect("/");

    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
};

// ================= EDIT PAGE =================
exports.editBook = async (req, res) => {
    try {
        let book = await Book.findById(req.params.id);

        if (!book) {
            console.log("Book not found");
            return res.redirect("/");
        }

        return res.render("editBook", { book });

    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
};

// ================= DELETE BOOK =================
exports.deleteBook = async (req, res) => {
    try {
        let book = await Book.findById(req.params.id);

        if (!book) {
            return res.redirect("/")
        }

        // delete image from uploads folder
        if (book.Image) {
            let oldPath = path.join(__dirname, "..", "uploads", book.Image);

            try {
                fs.unlinkSync(oldPath);
            } catch (err) {
                console.log("Image not found in uploads");
            }
        }

        await Book.findByIdAndDelete(req.params.id);

        return res.redirect("/");

    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
};

// ================= UPDATE BOOK =================
exports.updateBook = async (req, res) => {
    try {
        let book = await Book.findById(req.params.id);

        if (!book) {
            console.log("Book not found");
            return res.redirect("/");
        }

        let imagepath = book.Image;

        // if new image uploaded
        if (req.file) {

            // delete old image
            if (book.Image) {
                let oldPath = path.join(__dirname, "..", "uploads", book.Image);

                try {
                    fs.unlinkSync(oldPath);
                } catch (err) {
                    console.log("Old image not found");
                }
            }

            imagepath = req.file.filename; // ✅ new image
        }

        await Book.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                Image: imagepath
            },
            { new: true }
        );

        return res.redirect("/");

    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
};