const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { JWT_SECRET } = require("../config/envConfig");
const {
  hashedPassword,
  createToken,
  comparePassword,
} = require("../services/authService");

module.exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { name, email, password } = req.body;
    try {
      // Check if email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          errors: [{ msg: `${email} is already taken`, param: "email" }],
        });
      }

      // Hash password
      const hashPassword = await hashedPassword(password);

      // Create and save new user
      const newUser = new User({ name, email, password: hashPassword });
      const savedUser = await newUser.save();

      // Generate JWT token
      const token = createToken({
        id: savedUser._id,
        name: savedUser.name,
        role: savedUser.role,
      });

      res.status(201).json({ user: savedUser, token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server internal error" });
    }
  } else {
    // Validations failed
    return res.status(400).json({ errors: errors.array() });
  }
};

module.exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { email, password } = req.body;

    try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Compare password hashes
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate JWT token
      const token = createToken({ id: user._id, name: user.name });
      if (user.role === "auditor") {
        return res.json({ token, auditor: true });
      }
      return res.json({ token, auditor: false });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  } else {
    // Validation failed
    return res.status(400).json({ errors: errors.array() });
  }
};

module.exports.profile = async (req, res) => {
  const { userId } = req.body; // Get userId from URL parameter

  try {
    const user = await User.findById(userId).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.user && req.user.userId === user._id.toString()) {
      // User accessing their own profile, return complete information
      res.json(user);
    } else {
      // Return limited information for public profiles
      const publicUserData = {
        name: user.name,
        email: user.email, // Consider excluding email for privacy
        points: user.points, // Optionally exclude points based on access rules
      };
      res.json(publicUserData);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
