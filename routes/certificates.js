const express = require("express");

const certificatesController = require("../controllers/certificates");

const router = express.Router();

router.post("/post-certificate", certificatesController.postCertificate);
router.get("/get-certificates", certificatesController.getCertificates);
router.post("/delete-certificate", certificatesController.deleteCertificate);

module.exports = router;