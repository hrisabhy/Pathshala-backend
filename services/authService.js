const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/envConfig");

module.exports.hashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};

module.exports.comparePassword = async (password, dbPassword) => {
  return await bcrypt.compare(password, dbPassword);
};

module.exports.createToken = (user) => {
  return jwt.sign(user, JWT_SECRET, {
    expiresIn: "7d",
  });
};

module.exports.verifyToken = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      throw new Error("Unauthorized: No valid token provided");
    }
    const token = authorizationHeader.split(" ")[1];
    const decoded = await jwt.verify(token, JWT_SECRET, {
      algorithms: ["HS256"],
    });
    req.user = decoded;
  } catch (error) {
    console.error("Authentication error", error.message);
    return res.status(401).json({
      error: "Unauthorized: Invalid token or insufficient permissions",
    });
  }
};
