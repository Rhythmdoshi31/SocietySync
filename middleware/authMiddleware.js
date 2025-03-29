const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    console.log("🔍 Cookies Received in Middleware:", req.cookies); // Debugging Cookies

    const token = req.cookies?.token;
    if (!token) {
        console.error("❌ No token found in cookies. Redirecting to login.");
        return res.redirect("/auth/login");
    }

    try {
        const decoded = jwt.verify(token, "SECRET_KEY");
        console.log("✅ Decoded Token:", decoded); // Debug token data
        req.resident = decoded;
        next();
    } catch (err) {
        console.error("❌ Invalid or expired token. Redirecting to login.");
        return res.redirect("/auth/login");
    }
};

module.exports = authMiddleware;
