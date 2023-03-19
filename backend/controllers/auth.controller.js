const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { signUpErrors, signInErrors } = require("../utils/error.utils");
require("dotenv").config({ path: "./config/.env" });
const mailgun = require("mailgun-js");
const DOMAIN = "sandboxe005a374d0664d7a9cc4ee32061474a6.mailgun.org";
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN });




const maxAge = 3 * 24 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

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
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  const minLengthPseudo = 3
  const emailAll = []
  const users = await UserModel.find().select("-password");
users.forEach(function(user){
  emailAll.push(user.email)
 
})
const pseudoAll = []
const usersPseudo = await UserModel.find().select("-password");
usersPseudo.forEach(function(userPseudo){
  pseudoAll.push(userPseudo.pseudo)
 
})
  const { pseudo, email, password } = req.body;
  if (pseudo.length < minLengthPseudo) {
    return res.status(400).send({ message: "le pseudo doit avoir 3 caractère." })
  }
  if (!emailRegex.test(email)) {
    // Si l'adresse email n'est pas valide, retournez une erreur
    return res.status(400).send({ message: "Veuillez saisir une adresse email valide." });
  }
  if (!passwordRegex.test(password)) {
    // Si le mot de passe ne répond pas aux exigences de complexité, retournez une erreur
    return res.status(400).send({ message: "Le mot de passe doit contenir au moins 8 caractères, dont au moins une lettre majuscule, une lettre minuscule et un chiffre." });
  }
  
  // Si le mot de passe est valide, continuez le traitement de l'inscription de l'utilisateur
  const email2 = email;
  const pseudo2 = pseudo
  console.log(pseudo2);
  console.log(email2);
  if (emailAll.includes(email2) ) {
  res.status(400).json({message : "Cette email est déja utilisé pour un autre compte veuiilez vous connecter"})
  } else if(pseudoAll.includes(pseudo2)) {
    res.status(400).json({message : "Ce pseudo est déja utilisé pour un autre compte veuiilez vous connecter"})
  } else{
   

  
  
  

  const token2 = jwt.sign(
    { pseudo, email, password },
    process.env.TOKEN_SECRET2,
    { expiresIn: "20m" }
  );

  try {
    const data = {
      from: "samimakhloufi55@gmail.com",
      to: email,
      subject: "Valider votre inscription",
      html: `<h2> Veuillez cliquer sur le lien pour valider l'inscription </h2>
      <p> ${process.env.CLIENT_URL}/authentitication/activate/${token2}</p>
      
      `,
    };
    mg.messages().send(data, function (error, body) {
      // if (error) {
      //   return res.json({ error: err.message });
      // }
      return res.json({ message: "email envoyé" });
    });
  } catch {
      const errors = signUpErrors(err);
      res.status(200).send({ errors });
  }
}
};

module.exports.activateAccount = (req, res) => {
  const { token2 } = req.body;

  if (token2) {
    jwt.verify(token2, process.env.TOKEN_SECRET2, function (err, decodedToken) {
      if (err) {
        return res.status(400).json({ error: "incorrect or expired link" });
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
    return res.json({ error: "Something went wrong" });
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
