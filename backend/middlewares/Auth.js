const jwt = require('jsonwebtoken'); // Ensure jwt is imported

const ensureAuthenticated = (req, res, next) => {
    const auth = req.headers['authorization'];
    console.log('Incoming headers:', req.headers);
    console.log('Authorization header:', auth);

    if (!auth) {
        return res.status(403).json({ message: "Unauthorized access, jwt token required" });
    }

    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);
        req.user = decoded;
        next();
    } catch (err) {
        console.error('JWT verification error:', err.message);
        return res.status(403).json({ message: "Unauthorized access, jwt token wrong or expired" });
    }
};

module.exports = ensureAuthenticated;