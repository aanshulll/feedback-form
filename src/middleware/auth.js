const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        req.user = null; // No user is authenticated
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key");
        req.user = decoded; // Attach the decoded user to the request object
        next();
    } catch (error) {
        req.user = null; // Invalid token
        next();
    }
};

module.exports = authMiddleware;