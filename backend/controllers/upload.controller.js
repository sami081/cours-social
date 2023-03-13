const path = require('path');
const User = require("../models/user.model")
const Post = require("../models/post.model")


module.exports.uploadProfil = async (req, res, next) => {
    try {
        // Trouver l'utilisateur dans la base de données
        const user = await User.findById(req.params.id);
        if (!user) {
          return res.status(404).send('Utilisateur introuvable');
        }
    
        // Mettre à jour la photo de profil de l'utilisateur
        user.picture = "./uploads/profil/" + req.file.filename;
        await user.save();
    
        res.send('Photo de profil mise à jour avec succès');
      } catch (err) {
        next(err);
      }
};
module.exports.uploadPost = async (req, res, next) => {
    try {
        // Trouver le postr dans la base de données
        const post = await Post.findById(req.params.id);
        if (!post) {
          return res.status(404).send('post introuvable');
        }
    
        // Mettre à jour la photo de profil de l'utilisateur
        post.picture = "./uploads/post/" + req.file.filename;
        await post.save();
    
        res.send('Photo du post  mise à jour avec succès');
      } catch (err) {
        next(err);
      }
};
