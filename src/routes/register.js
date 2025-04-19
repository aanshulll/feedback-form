const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { generateToken } = require("../utils/jwt");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("register", { error: null, message: null });
});

router.post("/", async (req, res) => {
    try {
        const { rollno, name, password } = req.body;

        if (!rollno || !name || !password) {
            return res.status(400).render("register", {
                error: "Roll number, name, and password are required",
                message: null,
            });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ rollno });
        if (existingUser) {
            return res.status(400).render("register", {
                error: "User with this roll number already exists",
                message: null,
            });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Save the new user
        const newUser = new User({
            rollno,
            name,
            password: hashedPassword,
        });

        await newUser.save();

        // Generate JWT token
        const token = generateToken({ rollno: newUser.rollno, name: newUser.name });

        // Set token as a cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000, // 1 hour
            path: "/",
            sameSite: "lax",
        });

        // Redirect to home page
        res.redirect("/home");
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).render("register", {
            error: "An error occurred during registration",
            message: null,
        });
    }
});

module.exports = router;