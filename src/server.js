require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDB = require("../config/db");
const mongoose = require("mongoose");

const app = express();

// Connect to the database
connectDB().catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
});

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser());

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const homeRouter = require("./routes/home");
const profileRouter = require("./routes/profile");

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/home", homeRouter);
app.use("/profile", profileRouter); // Register the profile route

// Redirect to register page by default
app.get("/", (req, res) => {
    res.redirect("/landing");
});

// Add this route before the error handling middleware
app.get("/landing", (req, res) => {
    res.render("landing", {
        title: "Welcome to Feedback Form",
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render("error", {
        title: "Error",
        user: null // or user: { name: "Guest" }
    });
    
});

// Export the app without starting the server
module.exports = app;

// Start the server only if not in test mode
if (process.env.NODE_ENV !== "test") {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
