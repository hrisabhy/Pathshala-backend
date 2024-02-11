const express = require("express");
const { uploadNote } = require("../controllers/notesController");
const { upload } = require("../middleware/multerMiddleware");
const router = express.Router();

router.post("/notes", upload.single("pdf"), uploadNote);
router.get("/profile", profile);
module.exports = router;
