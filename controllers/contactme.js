const { validationResult } = require("express-validator");
const ContactMe = require("../models/contactme");
require("dotenv").config();

exports.postContactMe = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ message: "validation error", errors: errors.array() });
    }

    const name = req.body.name;
    const value = req.body.value;

    if (!name || !value) {
      return res.status(404).json({ message: "all fields are required" });
    }

    const contactMe = new ContactMe({ name, value });
    await contactMe.save();

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "server error posting contact me" });
    next(error);
  }
};

exports.getContactMe = async (_req, res, next) => {
  try {
    const contactMe = await ContactMe.find();
    return res.status(200).json({ message: "success", contactMe: contactMe });
  } catch (error) {
    return res.status(500).json({ message: "server error getting contact me" });
    next(error);
  }
};

exports.deletContactMe = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({message: "validation error", errors: errors.array()})
        }

        const contactMeId = req.body.contactMeId;

        if(!contactMeId){
            return res.status(404).json({message: "contact me id is required"})
        }

        const deletedContactMe = await ContactMe.findByIdAndDelete(contactMeId);

        if(!deletedContactMe){
            return res.status(404).json({message: "contact me not found"})
        }
        
        return res.status(200).json({message: "success"})

    } catch(error){
        return res.status(500).json({message: "server error deleting contact me"})
        next(error);
    }
}
