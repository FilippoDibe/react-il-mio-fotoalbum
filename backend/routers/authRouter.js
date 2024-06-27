const express = require("express");
const router = express.Router();
const validator = require("../middlewares/validator.js");
const {register, login} = require ("../controllers/userController.js");
const {registerBody, loginBody} = require("../validations/usersValidation.js");


//registrazione 
router.post('/register', validator(registerBody),  register);

//autenticazione 
router.post('/login', validator(loginBody), login)

module.exports = router;