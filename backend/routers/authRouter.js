const express = require("express");
const router = express.Router();
const validator = require("../middlewares/validator.js");
const {register, login} = require ("../controllers/userController.js");



//registrazione 
router.post('/register',  register);

//autenticazione 
router.post('/login', login)

module.exports = router;