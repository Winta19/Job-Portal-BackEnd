const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Ensure the 'uploads/' directory exists
const {
  getApplicantForms,
  getApplicantFormById,
  createApplicantForm,
  updateApplicantForm,
  deleteApplicantForm,
  updateStatusApplicantForm
} = require("../controllers/ApplicantFormController");

const router = express.Router();

router.get("/", getApplicantForms);
router.get("/:id", getApplicantFormById);
router.post("/",upload.single("cv"), createApplicantForm);
router.put("/:id", updateApplicantForm);
router.put("/changeStatus/:id", updateStatusApplicantForm);
router.delete("/:id", deleteApplicantForm);

module.exports = router;
