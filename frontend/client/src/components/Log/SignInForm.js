// import React, { useState } from "react";
// import axios from "axios";


// const SignInForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [formSubmit, setFormSubmit] = useState(false)

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const emailError = document.querySelector(".email.error");
//     const passwordError = document.querySelector(".password.error");
//     const forgotPassword = document.getElementById("forgotPassword");
   
//     axios({
//       method: "post",
//       url: `${process.env.REACT_APP_API_URL}api/user/login`,
//       withCredentials: true,
//       data: {
//         email: email,
//         password: password,
//       },
//     })
//       .then((res) => {
//         console.log(res);
//         if (res.data.errors.email) {
//           emailError.innerHTML = res.data.errors.email;
//           // passwordError.innerHTML = res.data.errors.password;
//         } else if(res.data.errors.password) {
//           passwordError.innerHTML = res.data.errors.password;
//           console.log(forgotPassword);
//           setFormSubmit(true)
//         }
//         else {
//           window.location = "/";
//         }
//       })
//       .catch((err) => {
        
//       });
//   };
//   return (
//     <>
    
//       <form action="" onSubmit={handleLogin} id="sign-up-form">
//         <label htmlFor="email">Email</label>
//         <input
//           type="email"
//           name="email"
//           id="email"
//           onChange={(e) => setEmail(e.target.value)}
//           value={email}
//         ></input>
//         <div className="email error"></div>

//         <label htmlFor="password"> Mot de passe</label>
//         <input
//           type="password"
//           name="password"
//           id="password"
//           onChange={(e) => setPassword(e.target.value)}
//           value={password}
//         ></input>
//         <div className="password error"></div>
//         <input type="submit" value="Se connecter" />
//       </form>
//       {formSubmit ? (
//         <a href="/forgot-password" target="blank" rel="noopener noreferrer">
//         {""}
//         mot de passe oublié
//       </a>
//       ) : (
// <></>
     
//       )}
//     </>
//   );
// };

// export default SignInForm;
import React, { useState } from "react";
import axios from "axios";


const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email: email,
        password: password,
      },
    }).then((res) => {
        console.log(res);
      if (res.data.errors) {
        emailError.innerHTML = res.data.errors.email;
        passwordError.innerHTML = res.data.errors.password;
      } else {
        window.location = "/";
      }
    })
    .catch((err) => {
        console.log(err);
    })
  };
  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form">
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      ></input>
      <div className="email error"></div>

      <label htmlFor="password"> Mot de passe</label>
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      ></input>
      <div className="password error"></div>
      <input type="submit" value="Se connecter" />
      <a href="/forgot-password" target="blank" rel="noopener noreferrer">
            {""}
             mot de passe oublié
          </a>
    </form>
     
  );
};

export default SignInForm;