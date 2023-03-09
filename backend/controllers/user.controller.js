const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

module.exports.getOneUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);
  try {
    const users = await UserModel.findById(req.params.id).select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send({ err });
    console.log("erreur server");
  }
};

module.exports.modifyOneUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);
  const oneUser = await UserModel.findById(req.params.id).select("-password");

  if (!oneUser) {
    res.status(400).json({ message: "Cet utilisateur n'existe pas" });
  }

  const updateUser = await UserModel.findByIdAndUpdate(oneUser, req.body, {
    new: true,
  }).select("-password");
  res.status(200).json(updateUser);
};

module.exports.deleteOneUser = async (req, res, next) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);

  UserModel.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ Utilisateur: "supprimer" });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};
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
module.exports.follow = async (req, res) => {
  if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.userId))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    // add to the follower list
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.userId } },
      { new: true, upsert: true }
      // (err, docs) => {
      //   if (!err) res.status(201).json(docs);
      //   else return res.status(400).json(err);
      // }
    ).select("-password").then((data) => res.status(200).json({ status: "succes", data }));
    // add to following list
    await UserModel.findByIdAndUpdate(
      req.body.userId,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true }
      // (err, docs) => {
      //   // if (!err) res.status(201).json(docs);
      //   if (err) return res.status(400).json(err);
      // }
    );
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports.unfollow = async (req, res) => {
  try {
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.userId } },
      { new: true }
    ).select("-password").then((data) => res.status(200).send(data));
  } catch (err) {
    res.status(400).json(err);
  }
  try {
    await UserModel.findByIdAndUpdate(
      req.body.userId,
      { $pull: { followers: req.params.id } },
      { new: true }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};
