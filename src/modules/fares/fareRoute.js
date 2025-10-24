const express = require("express");
const { getFares, getFaresById } = require("./fareController.js");

const router = express.Router();
router.get("/", getFares);
router.get("/:id", getFaresById);

module.exports = router;
