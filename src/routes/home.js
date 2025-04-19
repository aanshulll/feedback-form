const express = require("express");
const router = express.Router();
const { jwtAuth } = require("../utils/jwt");
const Feedback = require("../models/Feedback");

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
        const newFeedback = new Feedback(req.body);
        await newFeedback.save();
        console.log("Feedback saved:", req.body);
        res.redirect("submitted");
    } catch (err) {
        console.error("Error saving feedback:", err);
        res.status(500).send("Something went wrong.");
    }
});