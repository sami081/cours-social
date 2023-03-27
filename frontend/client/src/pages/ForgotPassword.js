import axios from "axios";
import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const result = document.querySelector(".result")

  const sendEmail = (e) => {
    e.preventDefault();
    console.log("oui");
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/forgot-password`,
      data: {
        email,
      },
    }).then((res)=> {
      console.log(res);
      result.innerHTML = res.data.message
    });
  };
  return (
    <form action="" onSubmit={sendEmail} id="">
      <label htmlFor="email">Veuillez entre votre email utilisateur : </label>
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <input type="submit" value="valider" />
      <div className="result"></div>
    </form>
  );
};

export default ForgotPassword;
