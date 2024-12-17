const express = require("express");
const { registerUSer, loginUSer, currentUSer } = require("../Controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();



router.post("/register" , registerUSer)

router.post("/login" , loginUSer);


router.get("/current" ,validateToken, currentUSer);


module.exports = router;