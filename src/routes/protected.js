const express = require("express");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.get("/dashboard", authMiddleware, (req, res) => {
    res.status(200).json({
        success: true,
        message: `Welcome, ${req.user.name}!`,
    });
});

module.exports = router;