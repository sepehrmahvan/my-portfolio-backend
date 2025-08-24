const express = require("express");

const portfolioController = require("../controllers/portfolio");

const router = express.Router();

router.post("/post-portfolio", portfolioController.postPortfolio);
router.get("/get-portfolio", portfolioController.getPortfolio);
router.post("/delete-portfolio", portfolioController.deletePortfolio);

module.exports = router;