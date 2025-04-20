const express = require("express");
const router = express.Router();
const { jwtAuth } = require("../utils/jwt");
<<<<<<< HEAD
const formdata = require("../models/form-data");
=======
const Feedback = require("../models/Feedback");

>>>>>>> a02e7040ca54d9a12bcbfcd17bb631d4b4c460f2
// GET route for feedback form (protected)
router.get("/", jwtAuth, (req, res) => {
    console.log("User authenticated:", req.user);
    res.render("home", {
        title: "Feedback Form",
        user: req.user,
    });
});

<<<<<<< HEAD
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
=======
// POST feedback and save to database
router.post("/feedback", jwtAuth, async (req, res) => {
    try {
        const newFeedback = new Feedback(req.body);
        await newFeedback.save();
        console.log("Feedback saved:", req.body);
        res.redirect("submitted");
    } catch (err) {
        console.error("Error saving feedback:", err);
        res.status(500).send("Something went wrong.");
    }
});
>>>>>>> a02e7040ca54d9a12bcbfcd17bb631d4b4c460f2
