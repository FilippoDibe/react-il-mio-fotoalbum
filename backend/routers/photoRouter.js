const express = require("express");
const router = express.Router();
const validator = require ("../middlewares/validator.js")
const {photoData} = require("../validations/photoValidation.js")
const {create, index, update, showBySlug, destroy} = require ("../controllers/photoController.js");
const uniqueSlug = require ("../middlewares/uniqueSlug.js");
const protect = require ("../middlewares/authMiddleware.js")



router.get("/", index)
router.get("/:slug", showBySlug)
router.post("/",validator(photoData),  uniqueSlug, create)
router.put("/:slug",validator(photoData), update)
router.delete("/:slug", destroy)



module.exports= router;