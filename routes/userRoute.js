const express = require("express");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  changePassword
} = require("../controllers/userController");
const { auth } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);

router.put("/:id/change-password",changePassword);
router.post("/login",loginUser);
router.put("/:id", updateUser);
router.post("/", createUser);

router.delete("/:id", deleteUser);

module.exports = router;
