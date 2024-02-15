const express = require("express");
const { uploadNote } = require("../controllers/notesController");
const { upload } = require("../middleware/multerMiddleware");
const { isUser } = require("../services/authorizationService");
const { uploadNoteValidation } = require("../validations/uploadNoteValidation");

const router = express.Router();

router.post(
  "/notes",
  [isUser, uploadNoteValidation, upload.single("file")],
  uploadNote
);
module.exports = router;
