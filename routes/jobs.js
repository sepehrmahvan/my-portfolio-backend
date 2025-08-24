const express = require("express");
const jobsController = require("../controllers/jobs");

const router = express.Router();

router.post("/post-job", jobsController.postJob);
router.get("/get-jobs", jobsController.getJobs);
router.post("/delete-job", jobsController.deleteJob);

module.exports = router;