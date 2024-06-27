const express = require("express");
const router = express.Router();
const validator = require("../middlewares/validator.js")
const { messageData } = require("../validations/messageValidation.js")
const {create, index, destroy} = require ("../controllers/messageController.js")

router.post("/",validator(messageData), create)
router.get("/", index)
router.delete("/:id", destroy)

module.exports = router;