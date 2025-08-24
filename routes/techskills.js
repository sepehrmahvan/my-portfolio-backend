const express = require("express");

const technicalskillsController = require("../controllers/techskills");

const router = express.Router();

router.post("/post-tech-skill", technicalskillsController.postSkill);

router.get("/get-tech-skills", technicalskillsController.getSkills);

router.post("/delete-tech-skill", technicalskillsController.deleteSkill);

module.exports = router;