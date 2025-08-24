const express = require("express");

const contactmeController = require("../controllers/contactme");

const router = express.Router();

router.post("/post-contact-me", contactmeController.postContactMe);
router.get("/get-contact-me", contactmeController.getContactMe);
router.post("/delete-contact-me", contactmeController.deletContactMe);

module.exports = router;
