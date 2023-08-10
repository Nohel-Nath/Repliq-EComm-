const express = require("express");
const router = express.Router();

router.use(express.json({ limit: "50mb" }));
router.use(express.urlencoded({ extended: true, limit: "50mb" }));
const userController = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.post("/registration", userController.registerAUser);
router.post("/login", userController.loginUser);
router.get("/logout", isAuthenticatedUser, userController.logoutUser);
router.get("/details", isAuthenticatedUser, userController.getUserDetails);
router.get(
  "/allUsers",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  userController.getAllUsers
);
router.delete(
  "/delete/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  userController.deleteUser
);
module.exports = router;
