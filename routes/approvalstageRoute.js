const express = require("express");
const {
  getApprovalStage,
  getApprovalStageById,
  createApprovalStage,
  updateApprovalStage,
  deleteApprovalStage,
} = require("../controllers/approvalstageController");

const router = express.Router();

router.get("/", getApprovalStage);
router.get("/:id", getApprovalStageById);
router.post("/", createApprovalStage);
router.put("/:id", updateApprovalStage);
router.delete("/:id", deleteApprovalStage);

module.exports = router;
