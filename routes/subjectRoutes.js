const express = require("express");
const subjectValidations = require("../validations/subjectValidations");
const {
  createSubject,
  fetchSubject,
  getAllSubjects,
  updateSubject,
  deleteSubject,
  test,
} = require("../controllers/subjectsController");
const { isAuditor } = require("../services/authorizationService");
const router = express.Router();

// Get all subjects
router.get("/allsubjects", getAllSubjects);

// Get subject by id
router.get("/fetch-subject/:id", subjectValidations, fetchSubject);

// Create new subject category - only auditors
router.post("/create-subject", subjectValidations, createSubject);

// Update existing subject - only auditors
router.put("/update-subject/:id", updateSubject);

// Delete existing subject
router.delete("/delete-subject/:id", deleteSubject);

// TeSting authorization
router.get("/test-auth", isAuditor, test);

module.exports = router;
