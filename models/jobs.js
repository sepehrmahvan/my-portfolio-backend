const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const jobsSchema = new Schema(
    {
        position: {
            type: String,
            required: true,
        },
        company: {
            type: String,
            required: true,
        },
        duration: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Jobs", jobsSchema);