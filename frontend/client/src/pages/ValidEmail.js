import React, { useState } from "react";
import axios from "axios";
import SignInForm from "../components/Log/SignInForm";

const ValidEmail = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  // const [token2, setToken2] = useState("");
  const handleValid = (e) => {
    e.preventDefault();
    const url = window.location.href;
    const tableau = url.split("/")
    console.log(tableau)
     const tokenError = document.querySelector(".token.error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/email/activate/${tableau[4]}`,
      data: {
        // token2
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
     

      <div className="token error"></div>
      <input type="submit" value="Valider l'enregistrement de vote compte" />
    </form>
        )}
    </>
  );
};

export default ValidEmail;
