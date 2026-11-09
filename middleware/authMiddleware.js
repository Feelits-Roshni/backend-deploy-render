const jwt = require("jsonwebtoken");

const authMiddleWare = (requiredRole = null) => {
  return (req, res, next) => {
    try {
      const authHeaders = req.headers.authorization;

      // FIX 1: && changed to ||
      if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          message: "Token not found",
        });
      }

      const token = authHeaders.split(" ")[1];

      // FIX 2: Use the matching environment variable name
      const decode = jwt.verify(token, process.env.Secret_key);

      console.log(decode);

      req.userid = decode.userid;
      req.role = decode.role;

      // FIX 3: 404 changed to 403
      if (requiredRole && req.role !== requiredRole) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: Access denied",
        });
      }

      next();
    } catch (err) {
      // FIX 4: success: true changed to false; 500 changed to 401
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  };
};

module.exports = authMiddleWare;