const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    name: String,
    rollno: String,
    teachingQuality: String,
    courseContent: String,
    classInteraction: String,
    assessmentMethods: String,
    overallExperience: String,
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Feedback", feedbackSchema);