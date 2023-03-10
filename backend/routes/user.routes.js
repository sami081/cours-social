const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

//auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

//user display

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getOneUser);
router.put("/:id", userController.modifyOneUser);
router.delete("/:id", userController.deleteOneUser);
//router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);
router.patch("/follow/:id", userController.follow);
module.exports = router;

