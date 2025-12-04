const express = require("express");
const router = express.Router();
const { searchFlights } = require("./searchController.js");

router.get("/:departure/:destination", searchFlights);

module.exports = router;
