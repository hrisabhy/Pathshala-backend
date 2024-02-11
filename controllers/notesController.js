const express = require("express");
const Note = require("../models/Note");

const upload = multer({ dest: "./public/tmp" });

module.exports.uploadNote = async (req, res) => {
  try {
    const { title, category } = req.body;
    const userId = req.user._id;
    const uploadedFile = req.file;
    cloudinary.uploader.upload(req.file.path, function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error",
        });
      }
      res.status(200).json({
        success: true,
        message: "Uploaded!",
        data: result,
      });
    });
    const newNote = new Note({
      title,
      category,
      userId,
      file: uploadedFile ? uploadedFile.filename : null, // Store file path
      approved: false, // Mark as pending
    });
    await newNote.save();
    res.status(201).json({ message: "Note created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
