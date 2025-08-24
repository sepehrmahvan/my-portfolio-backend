const { validationResult } = require("express-validator");
const Jobs = require("../models/jobs");
require("dotenv").config();

exports.postJob = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({message: "validation error", errors: errors.array()})
        }

        const position = req.body.position;
        const company = req.body.company;
        const duration = req.body.duration;
        const location = req.body.location;

        if(!position || !company || !duration || !location){
            return res.status(404).json({message: "all fields are required"})
        }

        const job = new Jobs({position, company, duration, location});

        await job.save();

        return res.status(200).json({message: "success"})
    } catch(error){
        return res.status(500).json({message: "server error posting job"})
        next(error);
    }
}

exports.getJobs = async (_req, res, next) => {
    try{
        const jobs = await Jobs.find().sort({ createdAt: -1 });
        return res.status(200).json({message: "success", jobs: jobs})
    } catch(error){
        return res.status(500).json({message: "server error getting jobs"})
        next(error);
    }
}

exports.deleteJob = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({message: "validation error", errors: errors.array()})
        }

        const jobId = req.body.jobId;

        if(!jobId){
            return res.status(404).json({message: "job id is required"})
        }

        const deletedJob = await Jobs.findByIdAndDelete(jobId);

        if(!deletedJob){
            return res.status(404).json({message: "job not found"})
        }

        return res.status(200).json({message: "success"})

    } catch(error){
        return res.status(500).json({message: "server error deleting job"})
        next(error);
    }
}