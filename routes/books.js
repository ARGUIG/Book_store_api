const express = require("express");
const router = express.Router();
const {verifyTokenAndAdmin} = require("../middlewares/verifyToken")
const {getAllBooks, getBookById, addBook, updateBookById, deleteBookByID} = require("../controllers/bookController")

// /api/books
router.route("/")
        .post(verifyTokenAndAdmin, addBook)
        .get(getAllBooks)

// /api/books/:id
router.route("/:id")
        .get(getBookById)
        .put(verifyTokenAndAdmin, updateBookById)
        .delete(verifyTokenAndAdmin, deleteBookByID)

module.exports = router;