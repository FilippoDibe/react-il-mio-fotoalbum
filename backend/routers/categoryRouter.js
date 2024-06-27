const express = require("express");
const router = express.Router();
const validator = require ("../middlewares/validator.js")
const { categoryData } = require ("../validations/categoryValidation.js")
const {create, index, destroy} = require ("../controllers/categoryController.js")
const protect = require ("../middlewares/authMiddleware.js")


router.post("/",validator(categoryData),protect, create)
router.get("/",protect, index)
router.delete("/:id",protect, destroy)

module.exports = router;