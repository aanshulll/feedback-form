const express = require("express");
const router = express.Router();
const { jwtAuth } = require("../utils/jwt");
const formdata = require("../models/form-data");
// GET route for feedback form (protected)
router.get("/", jwtAuth, (req, res) => {
    console.log("User authenticated:", req.user);
    res.render("home", {
        title: "Feedback Form",
        user: req.user,
    });
});

router.post("/feedback", jwtAuth, async (req, res) => {
    console.log("Feedback submitted:", req.body);
    const feedback = req.body;
    const newform = new formdata({
        name: feedback.name,
        rollno: feedback.rollno,
        teachingQuality: feedback.teachingQuality,
        courseContent: feedback.courseContent,
        classInteraction: feedback.classInteraction,
        assessmentMethods: feedback.assessmentMethods,
        overallExperience: feedback.overallExperience,
    });
    try {
        await newform.save();
        console.log("Feedback saved successfully");
        res.redirect("submitted");
    } catch (err) {
        console.error("Error saving feedback:", err);
        res.status(500).send("Error saving feedback");
    }
});

router.get("/submitted", (req, res) => {
    res.render("submitted", {
        title: "Feedback Submitted",
    });
});

module.exports = router;