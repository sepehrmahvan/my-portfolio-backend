const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const techskillsSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("TechnicalSkills", techskillsSchema)