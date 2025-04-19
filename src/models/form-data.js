const mongoose = require("mongoose");
const formDataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    rollno: {
        type: Number,
        required: true,
        trim: true
    },
    teachingQuality: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 1000
    },
    courseContent: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 1000
    },
    classInteraction: {
        type: String,
        required: true
    },
    assessmentMethods: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 1000
    },
    overallExperience: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 1000
    }
});

module.exports = mongoose.model("FormData", formDataSchema);
