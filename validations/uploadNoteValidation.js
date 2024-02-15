const { body } = require("express-validator");

module.exports.uploadNoteValidation = [
  // Title validation
  body("title")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  // Category validation
  body("category_name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Category is required")
    .isString()
    .withMessage("Category must be a string"),

  // File validation
  body("file")
    .exists()
    .withMessage("File is required")
    .custom((value, { req }) => {
      // Return true if valid, throw an error otherwise
      if (!req.file.mimetype.startsWith("application/pdf")) {
        throw new Error("Only PDF files are allowed");
      }
      if (req.file.size > 10485760) {
        // 10 MB limit
        throw new Error("File size must be less than 10 MB");
      }
      return true;
    }),
];
