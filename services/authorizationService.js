const express = require("express");
const { verifyToken } = require("./authService");
const roles = require("./roles");

module.exports.isAuditor = async (req, res, next) => {
  try {
    // Verify JWT token and extract user data
    await verifyToken(req, res, next);

    // Check if user has "auditor" role
    if (req.user.role !== roles.AUDITOR) {
      return res
        .status(403)
        .json({ error: "Unauthorized access: requires auditor role" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
