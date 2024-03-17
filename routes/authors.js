const express = require("express");
const router = express.Router();
const {verifyTokenAndAdmin} = require("../middlewares/verifyToken");
const { getAllAuthors, getAuthorByID, addAuthor, updateAuthorByID, deleteAuthorByID } = require("../controllers/authorController");

// api/authors
router.route("/")
        .get(getAllAuthors)
        .post(verifyTokenAndAdmin, addAuthor)

// api/authors/:id
router.route("/:id")
        .get(getAuthorByID)
        .put(verifyTokenAndAdmin, updateAuthorByID)
        .delete(verifyTokenAndAdmin, deleteAuthorByID)

module.exports = router;