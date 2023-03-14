const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const uploadController = require("../controllers/upload.controller");
const multer = require("multer");
//stokage image post
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `../../cours-social/frontend/client/public/uploads/post/`);
  },
  filename: function (req, file, cb) {
   
    
    cb(null, Date.now()+file.originalname);
    console.log("oui2");
    
  },
});
const upload = multer({ storage: storage });
//message routes

router.get("/", postController.readPost);
router.post("/", upload.single("image"), postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);
router.patch("/like-post/:id", postController.likePost);
router.patch("/unlike-post/:id", postController.unlikePost);
router.patch("/create-comment/:id", postController.createComment);
router.put("/edit-comment/:id", postController.updateComment);
router.patch("/delete-comment/:id", postController.deleteComment);

router.put("/:id/upload", upload.single("image"), uploadController.uploadPost);

//commentary routes

module.exports = router;
