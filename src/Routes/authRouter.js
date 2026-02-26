const express =require("express");
const { Registration, login, profileUpdate } = require("../Controller/UserController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const router = express.Router();

router.post("/register",Registration)
router.post("/login",login)
router.post("/profle-update",AuthMiddleware, profileUpdate)

module.exports =router