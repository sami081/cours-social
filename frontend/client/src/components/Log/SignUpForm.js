import React, { useState } from "react";
import axios from "axios";

// import ValidEmail from "../../pages/ValidEmail";

const SignUpForm = () => {
  // const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPasword, setcontrolPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const terms = document.getElementById("terms");
    const pseudoError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );
    const termsError = document.querySelector(".terms.error");
    const valid = document.querySelector(".valid");

    passwordConfirmError.innerHTML = "";
    termsError.innerHTML = "";
    pseudoError.innerHTML = "";
    emailError.innerHTML = "";
    passwordError.innerHTML = "";
    valid.innerHTML = "";

    if (password !== controlPasword || !terms.checked) {
      if (password !== controlPasword)
        passwordConfirmError.innerHTML =
          "Les mots des passe ne correspondent pas";

      if (!terms.checked)
        termsError.innerHTML = "Veuillez validez les conditions générales";
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,

        data: {
          pseudo,
          email,
          password,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            pseudoError.innerHTML = res.data.errors.pseudo;
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
          } else {
            valid.innerHTML =
              "Merci pour votre inscription un email vous a été envoyé veuiller suivre les instruction";
            // setFormSubmit(true)
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <form action="" onSubmit={handleRegister} id="sign-up-form">
        <label htmlFor="pseudo">Pseudo</label>
        <input
          type="text"
          name="pseudo"
          id="pseudo"
          onChange={(e) => setPseudo(e.target.value.toLowerCase())}
          value={pseudo}
          
        />
        <div className="pseudo error"></div>
        <label htmlFor="email">Email</label>
        <input
          type="test"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
          value={email}
        />
        <div className="email error"></div>
        <label htmlFor="password">Mot de passe </label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <div className="password error"></div>
        <label htmlFor="password-conf">Confirmer mot de passe</label>
        <input
          type="password"
          name="password"
          id="password-conf"
          onChange={(e) => setcontrolPassword(e.target.value)}
          value={controlPasword}
        />
        <div className="password-confirm error"></div>
        <input type="checkbox" id="terms" />
        <label htmlFor="terms">
          J'accepte les{" "}
          <a href="/" target="blank" rel="noopener noreferrer">
            {" "}
            conditions générales
          </a>
        </label>
        <div className="terms error"></div>

        <input type="submit" value="Valider l'inscription" />
      </form>
      <div className="valid"></div>
    </>
  );
};

export default SignUpForm;
