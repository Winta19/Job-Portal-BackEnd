const express = require("express");
const {
  getRolePermissions,
  getRolePermissionById,
  createRolePermission,
  updateRolePermission,
  deleteRolePermission,
} = require("../controllers/rolepermissionController");

const router = express.Router();

router.get("/", getRolePermissions);
router.get("/:id", getRolePermissionById);
router.post("/", createRolePermission);
router.put("/:id", updateRolePermission);
router.delete("/:id", deleteRolePermission);

module.exports = router;
