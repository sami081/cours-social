const express = require("express");
const router = express.Router();
const UserModel = require("../models/user.model")
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller");
const multer = require("multer");
const path = require("path");

//stokage image user
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `../../cours-social/frontend/client/public/uploads/profil/`);
  },
  filename: function (req, file, cb) {
    cb(null,  file.originalname);
    console.log(file);
  },
});
const upload = multer({ storage: storage });


//auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);
router.post("/email/activate", authController.activateAccount)
router.post("/forgot-password",authController.forgotPassword)
router.put("/update-password/:id/:token",authController.updatePassword)
// router.put("/modify/password", authController.modifyPassword)

//user display

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getOneUser);
router.put("/:id", userController.modifyOneUser);
router.delete("/:id", userController.deleteOneUser);
//router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);
router.patch("/follow/:id", userController.follow);
module.exports = router;

//upload

router.put("/:id/upload", upload.single("image"), uploadController.uploadProfil);

