// src/routes/profile.js
const express = require("express");
const router = express.Router();
const User = require("../models/user");
router.get("/", (req, res) => {
    res.render("profile", {
        user: {
            name:User.name,
            rollno: User.rollno,    
            
        },
        feedbackCount: 3
    });
});

module.exports = router;
