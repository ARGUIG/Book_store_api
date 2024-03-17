const express = require("express");
const router = express.Router();
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../middlewares/verifyToken");
const { updateUserByID, getAllUsers, getUserByID, deleteUserByID } = require("../controllers/userController");

// /api/users
router.route("/").get(verifyTokenAndAdmin, getAllUsers)

// /api/users/:id
router.route("/:id")
        .put(verifyTokenAndAuthorization, updateUserByID)
        .get(verifyTokenAndAuthorization, getUserByID)
        .delete(verifyTokenAndAuthorization, deleteUserByID)

module.exports = router;