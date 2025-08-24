const express = require("express");

const { body } = require("express-validator");

const posterController = require("../controllers/poster");

const router = express.Router();

// GET Poster Data
router.get("/get-poster-data", posterController.getPoster);

// POST poster Data
router.post("/change-poster", posterController.postPoster);

module.exports = router;