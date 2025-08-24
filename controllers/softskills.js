const { validationResult } = require("express-validator");
const SoftSkills = require("../models/softSkills");
require("dotenv").config();

exports.postSkills = async (req, res, next) => {
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

    const skill = new SoftSkills({ name });

    await skill.save();

    return res.status(200).json({ message: "success", skill: skill });
  } catch (error) {
    return res.status(500).json({ message: "server error posting skill" });
    next(error);
  }
};

exports.getskills = async (_req, res, _next) => {
  try {
    const skills = await SoftSkills.find().sort({ createdAt: -1 });
    return res.status(200).json({ message: "success", skills: skills });
  } catch (error) {
    return res.status(500).json({ message: "server error getting skills" });
    next(error);
  }
};

exports.deleteSkill = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({message: "validation error", errors: errors.array()})
        }

        const skillId = req.body.skillId;

        if(!skillId){
            return res.status(404).json({message: "skill id is required"})
        }

        const deletedSkill = await SoftSkills.findByIdAndDelete(skillId);

        if(!deletedSkill){
            return res.status(404).json({message: "skill not found"})
        }

        return res.status(200).json({message: "success", skill: deletedSkill})
    }catch(error){
        return res.status(500).json({message: "server error deleting skill"})
        next(error);
    }
}
