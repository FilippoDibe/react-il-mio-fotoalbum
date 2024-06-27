const express = require("express");
const router = express.Router();
const validator = require ("../middlewares/validator.js")
const { categoryData } = require ("../validations/categoryValidation.js")
const {create, index, destroy} = require ("../controllers/categoryController.js")

router.post("/",validator(categoryData), create)
router.get("/", index)
router.delete("/:id", destroy)

module.exports = router;