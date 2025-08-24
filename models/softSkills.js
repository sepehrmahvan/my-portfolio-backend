const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const softSkillsSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("SoftSkills", softSkillsSchema);