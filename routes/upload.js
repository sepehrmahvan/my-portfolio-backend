const express = require("express");
const { uploadFile, downloadFile } = require("../controllers/upload");
const upload = require("../middlewares/upload");
const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);
router.post("/download-resume", downloadFile)

module.exports = router;