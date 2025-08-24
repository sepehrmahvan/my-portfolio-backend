const { validationResult } = require("express-validator");
const Portfolio = require("../models/portfolio");
require("dotenv").config();

exports.postPortfolio = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ message: "validation error", errors: errors.array() });
    }
    const image = req.body.image;
    const link = req.body.link;
    const description = req.body.description;
    const title = req.body.title;

    if (!image || !link || !description || !title) {
      return res.status(404).json({ message: "all fields are required" });
    }

    const portfolio = new Portfolio({ image, link, description, title });

    await portfolio.save();

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "server error posting portfolio" });
    next(error);
  }
};

exports.getPortfolio = async (_req, res, next) => {
  try {
    const portfolio = await Portfolio.find().sort({ createdAt: -1 });

    if(!portfolio){
        return res.status(404).json({message: "portfolio not found"})
    }

    return res.status(200).json({ message: "success", portfolio: portfolio });
  } catch (error) {
    return res.status(500).json({ message: "server error getting portfolio" });
    next(error);
  }
};

exports.deletePortfolio = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({message: "validation error", errors: errors.array()})
        }

        const portfolioId = req.body.portfolioId;

        if(!portfolioId){
            return res.status(404).json({message: "portfolio id is required"})
        }

        const deletedPortfolio = await Portfolio.findByIdAndDelete(portfolioId);

        if(!deletedPortfolio){
            return res.status(404).json({message: "portfolio not found"})
        }

        return res.status(200).json({message: "success"})
    } catch(error){
        return res.status(500).json({message: "server error deleting portfolio"})
        next(error);
    }
}
