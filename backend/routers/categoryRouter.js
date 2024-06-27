const express = require("express");
const router = express.Router();

const {create, index, destroy} = require ("../controllers/categoryController.js")

router.post("/", create)
router.get("/", index)
router.delete("/:id", destroy)

module.exports = router;