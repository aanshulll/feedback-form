const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user");
const { generateToken } = require("../utils/jwt");

router.get("/", (req, res) => {
    res.render("login", { error: null });
});

router.post("/", async (req, res) => {
    try {
        const { rollno, password } = req.body;

        // Check if rollno and password are provided
        if (!rollno || !password) {
            return res.status(400).render("login", {
                error: "Roll number and password are required",
            });
        }

        // Check if user exists
        const user = await User.findOne({ rollno });
        if (!user) {
            return res.status(401).render("login", {
                error: "Invalid roll number or password",
            });
        }

        // Ensure the user has a password in the database
        if (!user.password) {
            return res.status(500).render("login", {
                error: "User account is not properly configured. Please contact support.",
            });
        }

        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).render("login", {
                error: "Invalid roll number or password",
            });
        }

        // Generate JWT token
        const token = generateToken({ rollno: user.rollno, name: user.name });

        // Set token as a cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000, // 1 hour
            path: "/",
            sameSite: "lax",
        });

        // Redirect to a dashboard or success page
        res.redirect("/home");
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).render("login", {
            error: "An error occurred during login",
        });
    }
});

module.exports = router;