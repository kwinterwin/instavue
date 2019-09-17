const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
	real_name: { type: String, default: "Unknown" },
	date_of_birth: { type: Date, default: Date.now() },
	email: { type: String },
	password: { type: String },
	avatarFile: { type: String, default: "" },
	photos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'images' }]
});

module.exports = mongoose.model("users", usersSchema); 