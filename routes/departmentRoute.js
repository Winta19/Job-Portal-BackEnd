const express = require("express");
const {
  deleteDepartment,
  getDepartmentById,
  getDepartment,
  updateDepartment, // Fixed typo
  createDepartment,
} = require("../controllers/departmentController");

const router = express.Router();

router.get("/", getDepartment);
router.get("/:id", getDepartmentById);
router.delete("/:id", deleteDepartment);
router.patch("/:id", updateDepartment); // Fixed typo
router.post("/", createDepartment);

module.exports = router;
