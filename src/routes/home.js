const express = require("express");
const router = express.Router();
const { jwtAuth } = require("../utils/jwt");
const Feedback = require("../models/Feedback");
const FormData = require("../models/form-data");

// GET route for feedback form (protected)
router.get("/", jwtAuth, (req, res) => {
    console.log("User authenticated:", req.user);
    res.render("home", {
        title: "Feedback Form",
        user: req.user,
    });
});

// POST feedback and save to database
router.post("/feedback", jwtAuth, async (req, res) => {
    try {
        const newFeedback = new FormData(req.body);
        await newFeedback.save();
        console.log("Feedback saved:", req.body);
        
        res.redirect("submitted");
    } catch (err) {
        if (err.name === "ValidationError") {
            console.error("Validation error:", err.errors);
        }
        console.error("Error saving feedback:", err.message, err);
        res.status(500).render("invalid", {
            title: "Error",
            user: req.user,
            error: "An error occurred while saving your feedback. Please try again.",
        });
    }
});

router.get("/submitted", (req, res) => {
    res.render("submitted", {
        title: "Feedback Submitted",
    });
});

module.exports = router;
