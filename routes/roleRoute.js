const express = require("express");
const {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} = require("../controllers/roleController");

const router = express.Router();

router.get("/", getRoles);
router.get("/:id", getRoleById);
router.post("/", createRole);
router.patch("/:id", updateRole);
router.delete("/:id", deleteRole);

module.exports = router;
