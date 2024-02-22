const express = require("express");
const router = express.Router();
const { updateUser, register, login } = require("../controllers/auth");
const authenticateUser = require("../middleware/authentication");
router.post("/register", register);
router.post("/login", login);
router.patch("/updateUser", authenticateUser, updateUser);

module.exports = router;
