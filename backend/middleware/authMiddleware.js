import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;

    // Check if token exists
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Format: Bearer <token>
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user id to request
    req.user = decoded.id;

    next(); // Move to next middleware/controller

  } catch (error) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
};

export default authMiddleware;