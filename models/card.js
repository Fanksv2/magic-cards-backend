const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Card = new Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
});

// Export model
module.exports = mongoose.model("Card", Card);
