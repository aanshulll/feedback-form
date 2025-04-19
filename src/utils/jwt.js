const jwt = require("jsonwebtoken");

const jwtAuth = (req, res, next) => {
    // Check for token in cookies or Authorization header
    const token =
        req.cookies?.token ||
        (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key");
        req.user = decoded; // Attach the decoded user to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
};

function generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET || "your_secret_key", {
        expiresIn: "1h",
    });
}

module.exports = { jwtAuth, generateToken };