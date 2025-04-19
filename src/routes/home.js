const express = require("express");
const router = express.Router();
const { jwtAuth } = require("../utils/jwt");

// GET route for feedback form (protected)
router.get("/", jwtAuth, (req, res) => {
    console.log("User authenticated:", req.user);
    res.render("home", {
        title: "Feedback Form",
        user: req.user,
    });
});

router.post("/feedback", jwtAuth, (req, res) => {
    console.log("Feedback submitted:", req.body);
    res.redirect("submitted");
});

router.get("/submitted", (req, res) => {
    res.render("submitted", {
        title: "Feedback Submitted",
    });
});

module.exports = router;