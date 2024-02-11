const express = require("express");
const SubjectCategory = require("../models/SubjectCategory");
const { validationResult } = require("express-validator");

module.exports.createSubject = async (req, res) => {
  const errors = validationResult(req);
  const { name } = req.body;
  if (errors.isEmpty()) {
    const exist = await SubjectCategory.findOne({ name });
    if (!exist) {
      await SubjectCategory.create({ name });
      return res
        .status(200)
        .json({ message: "Subject has been created successfully" });
    } else {
      return res
        .status(400)
        .json({ errors: [{ msg: `${name} subject already exists` }] });
    }
  } else {
    return res.status(400).json({ errors: errors.array() });
  }
};

module.exports.fetchSubject = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await SubjectCategory.findOne({ _id: id });
    return res.status(200).json({ subject: response });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.updateSubject = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const exist = await SubjectCategory.findOne({ name });
    if (!exist) {
      const response = await SubjectCategory.updateOne(
        { _id: id },
        { $set: { name } }
      );
      return res
        .status(200)
        .json({ message: "Your subject has updated successfully!" });
    } else {
      return res
        .status(400)
        .json({ errors: [{ msg: `${name} subject is already exist` }] });
    }
  } else {
    return res.status(400).json({ errors: errors.array() });
  }
};

module.exports.deleteSubject = async (req, res) => {
  const { id } = req.params;
  try {
    await SubjectCategory.deleteOne({ _id: id });
    return res
      .status(200)
      .json({ message: "Subject has deleted successfully!" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Server internal error!");
  }
};

module.exports.getAllSubjects = async (req, res) => {
  try {
    const subjectes = await SubjectCategory.find({});
    return res.status(200).json({ subjectes });
  } catch (error) {
    return res.status(500).json("Server internal error!");
  }
};

module.exports.test = async (req, res) => {
  try {
    const subjectes = await SubjectCategory.find({});
    return res.status(200).json({ subjectes });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Server internal error!");
  }
};
