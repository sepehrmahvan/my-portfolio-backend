const { validationResult } = require("express-validator");
const PosterData = require("../models/poster");

exports.postPoster = async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res
        .status(422)
        .json({ message: "validation faild, your entered data is invalid" });
    }

    const { title, subtitle, description, img, resume } = req.body;

    if (!title || !subtitle || !description || !img || !resume) {
        return res.status(402).json({ message: "All fields are required" });
      }

      const updatedPoster = await PosterData.findOneAndUpdate(
        {}, // empty filter: update the only poster
        { title, subtitle, description, img, resume },
        { upsert: true, new: true } // upsert = insert if not exists
      );


    res.status(200).json({ message: "success", poster: updatedPoster});
  } catch (error) {
    res.status(500).json({ message: error.message });
    next(error);
  }
};

exports.getPoster = async (_req, res, next) => {
    try{
        const posterList = await PosterData.find();

        res.status(200).json({message: "success", posterData: posterList})
    } catch (error) {
        res.status(500).json({message: error.message})
        next(error);
    }
}
