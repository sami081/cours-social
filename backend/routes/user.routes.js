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
// module.exports.follow = async (req, res) => {
//   try {
//     await UserModel.findByIdAndUpdate(
//       req.params.id,
//       { $addToSet: { following: req.body.userId } },
//       { new: true, upsert: true }
//     ).then((data) => res.status(200).send(data));
//   } catch (err) {
//     res.status(400).json(err);
//   }
//   try {
//     await UserModel.findByIdAndUpdate(
//       req.body.userId,
//       { $addToSet: { followers: req.params.id } },
//       { new: true,upsert: true }
//     ).then((data) => res.status(200).send(data));
//   } catch (err) {
//     res.status(400).json(err);
//   }
// };
