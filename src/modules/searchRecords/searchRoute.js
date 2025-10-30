const express = require("express");
const router = express.Router();
const { searchFlights } = require("./searchController.js");

router.post("/", searchFlights);

module.exports = router;
