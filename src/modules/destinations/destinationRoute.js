const express = require("express");
const {
  getDestinations,
  getDestinationsById,
} = require("./destinationController.js");

const router = express.Router();
router.get("/", getDestinations);
router.get("/:id", getDestinationsById);

module.exports = router;
