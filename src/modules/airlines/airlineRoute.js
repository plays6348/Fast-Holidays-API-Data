const express = require("express");
const { getAirlines, getAirlinesById } = require("./airlineController.js");

const router = express.Router();
router.get("/", getAirlines);
router.get("/:id", getAirlinesById);

module.exports = router;
