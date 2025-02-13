const express = require("express");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser
} = require("../controllers/userController");
const { auth } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/",
 // auth(['admin']),
  createUser);
router.post("/login",loginUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
