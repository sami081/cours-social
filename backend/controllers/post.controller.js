const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.readPost = async (req, res) => {
  const posts = await PostModel.find();
  res.status(200).json(posts);
};
module.exports.createPost = async (req, res) => {
  const newPost = new PostModel({
    posterId: req.body.posterId,
    message: req.body.message,
    video: req.body.video,
    likers: [],
    comments: [],
  });

  try {
    const post = await newPost.save();
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
module.exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);
  PostModel.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ message: "supprimer" });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

module.exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.userId))
    return res.status(400).send("ID inconnu : " + req.params.id);
  
    try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.userId },
      },
      { new: true, upsert : true },
    
    );
    await UserModel.findByIdAndUpdate(
      req.body.userId,
      {
        $addToSet: { likes: req.params.id },
      },
      { new: true, upsert : true }
   
    ).select("-password").then((data) => res.status(200).send(data));
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.userId))
    return res.status(400).send("ID unknown : " + req.params.id);
    try {
      await PostModel.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { likers: req.body.userId },
        },
        { new: true, upsert : true },
      
      );
      await UserModel.findByIdAndUpdate(
        req.body.userId,
        {
          $pull: { likes: req.params.id },
        },
        { new: true, upsert : true }
     
      ).then((data) => res.status(200).send(data));
    } catch (err) {
      return res.status(400).send(err);
    }
  };
