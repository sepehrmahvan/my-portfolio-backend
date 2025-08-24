const { validationResult } = require("express-validator");
const TechnicalSkills = require("../models/techskills");
require("dotenv").config();

exports.postSkill = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ message: "validation error", errors: errors.array() });
    }

    const name = req.body.name;

    if (!name) {
      return res.status(404).json({ message: "name is required" });
    }

    const skill = new TechnicalSkills({ name });

    await skill.save();
    res
      .status(201)
      .json({ message: "skill posted successfully", skill: skill });
  } catch (error) {
    res.status(500).json({ message: "server error posting skill" });
    next(error);
  }
};

exports.getSkills = async (_req, res, _next) => {
  try {
    const skills = await TechnicalSkills.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "success", skills: skills });
  } catch (error) {
    res.status(500).json({ message: "server error getting technical skills" });
  }
};

exports.deleteSkill = async (req, res, _next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ message: "validation error", errors: errors.array() });
    }

    const skillId = req.body.skillId;

    if(!skillId){
        return res.status(404).json({message: "skill id is required"});
    }

    const deletedSkill = await TechnicalSkills.findByIdAndDelete(skillId);
    
    if (!deletedSkill) {
      return res.status(404).json({message: "skill not found"});
    }

    res.status(200).json({message: "skill deleted successfully"});

  } catch (error) {
    res.status(500).json({ message: "server error deleting skill" });
  }
};
