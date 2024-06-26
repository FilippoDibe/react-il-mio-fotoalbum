const express = require("express");
const router = express.Router();

const {create, index, update, showBySlug, destroy} = require ("../controllers/photoController.js");
const uniqueSlug = require ("../middlewares/uniqueSlug.js");



router.get("/", index)
router.get("/:slug", showBySlug)
router.post("/", uniqueSlug, create)
router.put("/:slug", update)
router.delete("/:slug", destroy)



module.exports= router;