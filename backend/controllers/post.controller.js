const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const CommentModel = require("../models/comment.model");
const fs = require("fs");
const { log } = require("console");
const postModel = require("../models/post.model");

module.exports.readPost = async (req, res) => {
  const posts = await PostModel.find();
  res.status(200).json(posts);
};
module.exports.readPostUser = async (req, res) => {};

module.exports.createPost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    
    const newPost = new PostModel({
      userId: req.params.id,
      message: req.body.message,
      video: req.body.video,
      likers: [],
      comments: [],
      picture:  req.file !=null ? "./uploads/post/" + req.file.filename : "",
    });
    const post = await newPost.save();
    console.log("oui");

    await UserModel.findByIdAndUpdate(
      req.body.userId,
      {
        $addToSet: { posts: post._id },
      },
      { new: true, upsert: true }
    );
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};
module.exports.updatePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const post = await PostModel.findById(req.params.id);

  if (!post) {
    res.status(400).json({ message: "Ce poste n'existe pas" });
  }

  const updatePost = await PostModel.findByIdAndUpdate(post, req.body, {
    new: true,
  });
  res.status(200).json(updatePost);
};
module.exports.deletePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);
  const post = await PostModel.findByIdAndRemove(req.params.id);

  if (post) {
    const user = await UserModel.findByIdAndUpdate(
      post.userId,
      { $pull: { posts: req.params.id } },
      { new: true, upsert: true }
    );

    const filename = post.picture;
    console.log(filename);

    const path = "../frontend/client/public/" + filename;

    // Supprimer le fichier avec fs.unlink()
    if(post.picture === "" ) {
    console.log('test');
    }
    else{

      fs.unlink(path, (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Erreur lors de la suppression de l'image");
        }
      });
    }
  }
  await PostModel.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ message: "supprimer" });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
  // UserModel.findByIdAndUpdate(
  //   req.body.userId,
  //   {
  //     $pull: { posts: post._id },
  //   },
  //   { new: true, upsert: true }
  // );
};

module.exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.userId },
      },
      { new: true, upsert: true }
    );
    await UserModel.findByIdAndUpdate(
      req.body.userId,
      {
        $addToSet: { likes: req.params.id },
      },
      { new: true, upsert: true }
    )
      .select("-password")
      .then((data) => res.status(200).send(data));
  } catch (err) {
    return res.status(200).send(err);
  }
};

module.exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.userId },
      },
      { new: true, upsert: true }
    );
    await UserModel.findByIdAndUpdate(
      req.body.userId,
      {
        $pull: { likes: req.params.id },
      },
      { new: true, upsert: true }
    ).then((data) => res.status(200).send(data));
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.createComment = async (req, res) => {
  if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.userId))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    const newComment = new CommentModel({
      postId: req.params.id,
      text: req.body.text,
      userId: req.body.userId,
      userPseudo: req.body.userPseudo,
    });
    const comment = await newComment.save();
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { comments: comment._id },
      },
      { new: true, upsert: true }
    );

    return res.status(201).json(comment);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.updateComment = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const comment = await CommentModel.findById(req.params.id);

  if (!comment) {
    res.status(400).json({ message: "Ce poste n'existe pas" });
  }

  const updateComment = await CommentModel.findByIdAndUpdate(
    comment,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updateComment);
};

// module.exports.deleteComment = async (req, res) => {
//   if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.postId))
//     return res.status(400).send("ID unknown : " + req.params.id);
//   try {
//     await CommentModel.deleteOne({ _id: req.params.id });

//     res.status(200).json({ message: "Votre commentaire a été supprimer" });

//     await PostModel.findByIdAndUpdate(
//       req.body.postId,
//       { $pull: { comments: req.params.id } },
//       { new: true }
//     );
//   } catch (err) {
//     res.status(400).json(err);
//   }
// };
module.exports.commentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(400).send(err);
  }
};

// module.exports.editCommentPost =  (req, res) => {
//   // if (!ObjectID.isValid(req.params.id))
//   //   return res.status(400).send("ID unknown : " + req.params.id);

//   // try {
//   //   return PostModel.findById(req.params.id, (err, docs) => {
//   //     const theComment = docs.comments.find((comment) =>
//   //       comment._id.equals(req.body.commentId)
//   //     );

//   //     if (!theComment) return res.status(404).send("Comment not found");
//   //     theComment.text = req.body.text;

//   //     return docs.save((err) => {
//   //       if (!err) return res.status(200).send(docs);
//   //       return res.status(500).send(err);
//   //     });
//   //   });
//   // } catch (err) {
//   //   return res.status(400).send(err);
//   // }
//   if (!ObjectID.isValid(req.params.id))
//     return res.status(400).send("ID unknown : " + req.params.id);
// try {
// const postId = req.params.id
// console.log(postId);
// const commentId = req.body.commentId
// console.log(commentId);

//   const text =  req.body.text

// console.log(text);
// PostModel.findById(postId).then((post)=> {
//   const commentIndex = post.comments.findIndex((comment)=> {
//     return comment._id.toString()==commentId
//   });
//   post.comments[commentIndex].text = req.body.text;

//   return post.save()
// }).then((data)=> res.status(200).send(data))
// }
// catch {

// }
// }
async function updateComment(postId, commentId, newText) {
  const post = await PostModel.findById(postId);
  const comment = post.comments.id(commentId);
  comment.text = newText;
  await post.save();
}

module.exports.editComment = async(req, res) => {
  if (!ObjectID.isValid(req.params.postId))
  return res.status(400).send("ID unknown : " + req.params.postId);
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const newText = req.body.text;
  try {
    await updateComment(postId, commentId, newText);
    res.send('Comment updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while updating the comment');
  }
}
module.exports.deleteComment = async (req, res)=> {
  if (!ObjectID.isValid(req.params.postId))
  return res.status(400).send("ID unknown : " + req.params.postId);
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  try {
    const post = await PostModel.findOneAndUpdate(
      { _id: postId },
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );
    res.send("dell comment")

    return post;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// module.exports.deleteCommentPost = (req, res) => {
//   if (!ObjectID.isValid(req.params.id))
//     return res.status(400).send("ID unknown : " + req.params.id);

//   try {
//     return PostModel.findByIdAndUpdate(
//       req.params.id,
//       {
//         $pull: {
//           comments: {
//             _id: req.body.commentId,
//           },
//         },
//       },
//       { new: true }
//     )
//       .then((data) => res.send(data))
//       .catch((err) => res.status(500).send({ message: err }));
//   } catch (err) {
//     return res.status(400).send(err);
//   }
// };
