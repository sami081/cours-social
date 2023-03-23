import React, { useState } from "react";
import axios from "axios";
import SignInForm from "../components/Log/SignInForm";

const ValidEmail = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [token2, setToken2] = useState("");
  const handleValid = (e) => {
    e.preventDefault();
     const tokenError = document.querySelector(".token.error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/email/activate`,
      data: {
        token2
      }
    }).then((data) => {
      if(data.data.message) {
        tokenError.innerHTML = data.data.message
      } else {
        setFormSubmit(true)
      }
      
    });
  };

  return (
    <>
    {formSubmit ? (
      <>
      <h4>L'enregistrement a bien été effectué veuiller vous connecté</h4>
      <SignInForm/>
      </>
    ) : (

      <form action="" onSubmit={handleValid} id="valid-email">
        <h4>Un email vous a été envoyé veuiller suivre les instruction avant de vous connecté</h4>
      <label htmlFor="token2">Code de vérification : </label>
      <input
        type="text"
        name="token2"
        id="token2"
        onChange={(e) => setToken2(e.target.value)}
        value={token2}
        />

      <div className="token error"></div>
      <input type="submit" value="Valider le code" />
    </form>
        )}
    </>
  );
};

export default ValidEmail;
