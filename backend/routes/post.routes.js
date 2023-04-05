const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const uploadController = require("../controllers/upload.controller");
const multer = require("multer");

// const fileFilter = (req, file, callback) => {
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'video/mp4') {
//     callback(null, true);
//   } else {
//     callback(null, false);
//   }
// };
//stokage image post
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `../frontend/client/public/uploads/post/`);
  },
  filename: function (req, file, cb) {
   
    
    cb(null, Date.now()+file.originalname);
    console.log("oui2");
    
  },
});
const upload = multer({ storage: storage, });
//message routes

router.get("/", postController.readPost);

router.post("/:id", upload.single("file"), postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);
router.patch("/like-post/:id", postController.likePost);
router.patch("/unlike-post/:id", postController.unlikePost);
router.patch("/create-comment/:id", postController.createComment);
router.put("/edit-comment/:id", postController.updateComment);
// router.patch("/delete-comment/:id", postController.deleteComment);
//test
router.patch('/comment-post/:id', postController.commentPost);
// router.patch('/edit-comment-post/:id', postController.editCommentPost);
router.put("/:postId/edit-comment/:commentId", postController.editComment);
// router.patch('/delete-comment-post/:id', postController.deleteCommentPost);
router.delete("/:postId/delete-comment/:commentId", postController.deleteComment)
router.put("/:id/upload", upload.single("file"), uploadController.uploadPost);

//commentary routes

module.exports = router;
