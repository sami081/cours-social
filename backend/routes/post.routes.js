const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");

//message routes

router.get("/", postController.readPost);
router.post("/", postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);
router.patch("/like-post/:id", postController.likePost);
router.patch("/unlike-post/:id", postController.unlikePost);
router.patch ("/create-comment/:id", postController.createComment)
router.put ("/edit-comment/:id", postController.updateComment)
router.patch("/delete-comment/:id", postController.deleteComment)


//commentary routes



module.exports = router;
