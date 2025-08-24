const express = require('express');

const softSkillsController = require("../controllers/softskills");

const router = express.Router();

router.post("/post-soft-skill", softSkillsController.postSkills);
router.get("/get-soft-skills", softSkillsController.getskills);
router.post("/delete-soft-skill", softSkillsController.deleteSkill);

module.exports = router;