const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { signUpErrors, signInErrors } = require("../utils/error.utils");
require("dotenv").config({ path: "./config/.env" });
const mailgun = require("mailgun-js");
const DOMAIN = "sandboxe005a374d0664d7a9cc4ee32061474a6.mailgun.org";
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN });

const crypto = require("crypto");

const maxAge = 3 * 24 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

function generateRandomToken(length) {
  const buffer = crypto.randomBytes(length);
  return buffer.toString("hex").substring(0, length);
}
const token = generateRandomToken(6);

// module.exports.signUp = async (req, res) => {
//   console.log(req.body);
//   const { pseudo, email, password } = req.body;

//   try {
//     const user = await UserModel.create({ pseudo, email, password });
//     res.status(201).json({ user: user._id });
//   } catch (err) {
//     const errors = signUpErrors(err);
//     res.status(200).send({ errors });
//   }
// };
module.exports.signUp = async (req, res) => {
  //verification de saisie
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  const minLengthPseudo = 3;
 
  let errors = { pseudo: "", email: "", password: "" };
  const emailAll = [];
  const users = await UserModel.find().select("-password");
  users.forEach(function (user) {
    emailAll.push(user.email);
  });
  const pseudoAll = [];
  const usersPseudo = await UserModel.find().select("-password");
  usersPseudo.forEach(function (userPseudo) {
    pseudoAll.push(userPseudo.pseudo);
  });
  const { pseudo, email, password } = req.body;
  if (pseudo.length < minLengthPseudo) {
    errors.pseudo = " le pseudo doit avoir 3 caractère minimum";
    return res.status(200).json({ errors });
  }
  if (!emailRegex.test(email)) {
    // Si l'adresse email n'est pas valide, retournez une erreur
    errors.email = "cet email n'est pas valide";
    return res.status(200).json({ errors });
  }
  if (!passwordRegex.test(password)) {
    errors.password =
      "Le mot de passe doit contenir minimum 8 caractère dont au moins une majuscule, une minuscule, un chiffre";
    // Si le mot de passe ne répond pas aux exigences de complexité, retournez une erreur
    return res.status(200).json({ errors });
  }

  // Si le mot de passe est valide, continuez le traitement de l'inscription de l'utilisateur
  const email2 = email;
  const pseudo2 = pseudo;
  console.log(pseudo2);
  console.log(email2);
  if (emailAll.includes(email2)) {
    errors.email = "Cet email est déja pris";
    res.status(200).json({
      errors,
    });
  } else if (pseudoAll.includes(pseudo2)) {
    errors.pseudo = "ce pseudo est deja pris";
    res.status(200).json({
      errors,
    });
  } else {
    token2 = jwt.sign(
      { pseudo, email, password },
      process.env.TOKEN_SECRET2,
      {
        expiresIn: "20m",
      }
    );
  
  
   
    try {
      const data = {
        from: "samimakhloufi55@gmail.com",
        to: email,
        subject: "Valider votre inscription",
        html: `<h2> Veuillez cliquer sur le lien pour activer le compte  </h2>
      <p> ${process.env.CLIENT_URL}/activation-account/${token2}</p>
 
      
      `,
      };
      mg.messages().send(data, function (error, body) {
        // if (error) {
        //   return res.json({ error: err.message });
        // }
        return res.json({ message: "email envoyé" });
      });
    } catch (err) {
      // const errors = signUpErrors(err);
      res.status(400).send({ err });
      lo;
    }
  }
};

module.exports.activateAccount = (req, res) => {
  const { token2} = req.params;
  let error = { code: "" };

  if (token2) {
    jwt.verify(token2, process.env.TOKEN_SECRET2, function (err, decodedToken) {
      if (err) {
        error.code =
          "Le code n'est pas bon ou a expirer veuiller recommencer l'inscription ou saisir le bon code";
        return res.status(200).json({ message: error.code });
      }
      const { pseudo, email, password } = decodedToken;

      try {
        const user = UserModel.create({ pseudo, email, password });
        res.status(201).json({ user: user._id });
      } catch (err) {
        // const errors = signUpErrors(err);
        // res.status(200).send({ errors });
      }
    });
  } else {
    return res.status(200).json({ error: "Something went wrong" });
  }
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = signInErrors(err);
    res.status(200).json({ errors });
  }
};

module.exports.logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

module.exports.forgotPassword = async (req, res) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  const { email } = req.body;

  try {
    if (!emailRegex.test(email)) {
      // Si l'adresse email n'est pas valide, retournez une erreur

      return res.status(200).json({ message: "email incorrect" });
    }
    const oldUser = await UserModel.findOne({ email });
    if (!oldUser) {
      return res.json({ message: "cet email est associé a aucun compte" });
    }
    const secret = process.env.TOKEN_SECRET2;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "10m",
    });
    const data = {
      from: "samimakhloufi55@gmail.com",
      to: email,
      subject: "Réinitialisation de mot de passe'",
      html: `<h2> Veuillez cliquer sur le lien pour Réinitialiser votre mot de passe'</h2>
            <p> ${process.env.CLIENT_URL}/modify-password/${oldUser._id}/${token}</p>
            
            `,
    };
    mg.messages().send(data, function (error, body) {
      // if (error) {
      //   return res.json({ error: err.message });
      // }
      return res.json({ message: "Un email vous a été envoyé" });
    });
  } catch (error) {}
};

module.exports.updatePassword = async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  const { password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET2, function (err, decodedToken) {
      if (err) {
        return res.status(400).json({ error: "incorrect or expired link" });
      }
      const oldUser = UserModel.findOne({ _id: id });
      if (!oldUser) {
        return res.json({ status: "User Not Exists !!" });
      }

      try {
        // Recherche de l'utilisateur par ID
        //   const user =  UserModel.findById(id);

        //   if (!user) {
        //     return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        //   }

        //   // Modification de la bio de l'utilisateur
        //   user.password = password;

        //   // Enregistrement des modifications
        // user.save();

        //   return res.status(200).json({ message: 'mot de passe modifie', user });
        if (!passwordRegex.test(password)) {
          // Si le mot de passe ne répond pas aux exigences de complexité, retournez une erreur
          return res.status(200).json({
            message:
              "Le mot de passe doit contenir au moins 8 caractères, dont au moins une lettre majuscule, une lettre minuscule et un chiffre.",
          });
        }
        const user = UserModel.updateOne(
          { _id: id },
          { password: encryptedPassword, _id: id }
        )
          .then(() => res.status(200).json({ message: "Mot de passe modifié" }))
          .catch((error) => res.status(400).json({ error }));
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          message:
            "Une erreur s'est produite lors de la mise à jour de la bio de l'utilisateur.",
        });
      }
    });
  } else {
    return res.json({ error: "Something went wrong" });
  }
};
