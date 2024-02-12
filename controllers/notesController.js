const express = require("express");
const multer = require("multer");
const fs = require("fs");
const cloudinary = require("../config/cloudinaryConfig");
const Note = require("../models/Note");
const upload = require("../middleware/multerMiddleware");
const SubjectCategory = require("../models/SubjectCategory");
module.exports.uploadNote = async (req, res) => {
  try {
    const { title, category_name, userId } = req.body;
    // const userId = req.user._id;
    const uploadedFile = req.file.path;
    console.log(uploadedFile);
    const uploadOptions = {
      use_filename: true,
      overwrite: true,
      resource_type: "auto",
    };
    cloudinary.uploader.upload(
      uploadedFile,
      uploadOptions,
      async function (err, result) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: "Error",
          });
        }
        fs.unlinkSync(uploadedFile);
        const cat_res = await SubjectCategory.findOne({ name: category_name });
        console.log(cat_res);
        const newNote = new Note({
          title,
          category: cat_res._id,
          uploadedBy: userId,
          pdf: result.public_id, // Store the Cloudinary public ID of the uploaded file
          approved: false, // Mark as pending
        });
        await newNote.save();
        res.status(201).json({
          message: "Note created and uploaded successfully",
          data: result,
        });
      }
    );
  } catch (error) {
    console.log("Control reached in the catch block");
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
