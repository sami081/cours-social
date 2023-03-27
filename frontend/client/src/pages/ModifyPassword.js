import axios from "axios";
import React, { useState } from "react";
import SignInForm from "../components/Log/SignInForm";

const ModifyPassword = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [password, setPassword] = useState("");

  const [controlPasword, setcontrolPassword] = useState("");
  const handleModif = async (e) => {
   
    e.preventDefault();
    const url = window.location.href;
    const tableau = url.split("/")
    console.log(tableau)
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );
    const error = document.querySelector(".errors")
    passwordConfirmError.innerHTML = "";
    passwordError.innerHTML = "";
    error.innerHTML="";
    
    if (password !== controlPasword) {
      passwordConfirmError.innerHTML =
        "Les mots des passe ne correspondent pas";
    } else {
      await axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}api/user/update-password/${tableau[4]}/${tableau[5]}`,
        data: {
          password,
        },
      }).then((data) => {
        console.log(data);
        if (data.data.message === "Le mot de passe doit contenir au moins 8 caractères, dont au moins une lettre majuscule, une lettre minuscule et un chiffre.") {
         error.innerHTML = data.data.message;
        //  setFormSubmit(true);
        } else {
          setFormSubmit(true);
        }
      });
    }
  };
  return (
    <>
      {formSubmit ? (
        <>
          <h4>
            {" "}
            Votre mot de passe a bien été modifié. Vous pouvez vous connecté
            avec votre nouveau mot de passe
          </h4>
          <SignInForm />
        </>
      ) : (
        <form action="" onSubmit={handleModif} id="valid-password">
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
          <div className="errors"></div>

          <input type="submit" value="Modifier le mot de passe" />
        </form>
      )}
    </>
  );
};

export default ModifyPassword;
