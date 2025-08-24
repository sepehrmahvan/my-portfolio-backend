const { validationResult } = require("express-validator");
const Certificates = require("../models/certificates");
require("dotenv").config();

exports.postCertificate = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ message: "validation error", errors: errors.array() });
    }

    const name = req.body.name;
    const image = req.body.image;

    if (!name || !image) {
      return res.status(404).json({ message: "all fields are required" });
    }

    const certificate = new Certificates({ name, image });

    await certificate.save();

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error posting certificate" });
    next(error);
  }
};

exports.getCertificates = async (_req, res, next) => {
  try {
    const certificates = await Certificates.find();
    return res
      .status(200)
      .json({ message: "success", certificates: certificates });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error getting certificates" });
    next(error);
  }
};

exports.deleteCertificate = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({message: "validation error", errors: errors.array()})
        }

        const certificateId = req.body.certificateId;

        if(!certificateId){
            return res.status(404).json({message: "certificate id is required"})
        }

        const deletedCertificate = await Certificates.findByIdAndDelete(certificateId);

        if(!deletedCertificate){
            return res.status(404).json({message: "certificate not found"})
        }

        return res.status(200).json({message: "success"})

    } catch(error){
        return res.status(500).json({message: "server error deleting certificate"})
        next(error);
    }
}
