const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

module.exports = function (requiredRole) {
  return (req, res, next) => {
    const auth = req.headers.authorization?.split(" ")[1];
    if (!auth) return res.status(401).json({ message: "No token" });
    try {
      const payload = jwt.verify(auth, SECRET);
      req.user = payload;
      if (requiredRole && payload.role !== requiredRole) {
        return res.status(403).json({ message: "Forbidden" });
      }
      next();
    } catch (e) {
      res.status(401).json({ message: "Invalid token" });
    }
  };
};
