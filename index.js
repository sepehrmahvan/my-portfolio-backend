const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());

app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, PUT, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// poster
const posterData = require("./routes/poster");
app.use("/api", posterData);

// techskills
const techskillsData = require("./routes/techskills");
app.use("/api", techskillsData);

// softskills
const softskillsData = require("./routes/softSkills");
app.use("/api", softskillsData);

// jobs
const jobsData = require("./routes/jobs");
app.use("/api", jobsData);

// certificates
const certificatesData = require("./routes/certificates");
app.use("/api", certificatesData);

// contactme
const contactmeData = require("./routes/contactme");
app.use("/api", contactmeData);

// portfolio
const portfolioData = require("./routes/portfolio");
app.use("/api", portfolioData);

// upload
const uploadData = require("./routes/upload");
app.use("/api", uploadData);

// auth
const authData = require("./routes/auth");
app.use("/api/auth", authData);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log("server running on port 8080")
    );
  })
  .catch((err) => {
    console.log(err);
  });
