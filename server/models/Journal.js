const mongoose = require("mongoose");

const JournalSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        note: {type: String, required: true},
        img: {type: String}
    },
    {timestamps: true}
);

module.exports = mongoose.model("Journal", JournalSchema);