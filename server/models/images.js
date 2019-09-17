const mongoose = require("mongoose");

const imagesSchema = new mongoose.Schema({
    path: { type: mongoose.Schema.Types.String },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    date: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("images", imagesSchema); 