const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const posterSchema = new Schema(
    {
        title: {type: String, requireeds: true},
        subtitle: {type: String, requireeds: true},
        description: {type: String, requireeds: true},
        img: {type: String, requireeds: true},
        resume: {type: String, requireeds: true}
    },
    {timestamps: true}
);

module.exports = mongoose.model("PosterData", posterSchema);