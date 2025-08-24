const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const uploadSchema = new Schema(
    {
        file: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Upload", uploadSchema);