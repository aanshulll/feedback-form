const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    rollno: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true, // Ensure password is required
    },
});

module.exports = mongoose.model("User", userSchema);
