import React from "react";
import LeftNav from "../LeftNav";
import { useSelector } from "react-redux";

const UpdateProfil = () => {
  const userData = useSelector((state) => state.user);
  return (
    <div className="profil-container">
      {<LeftNav /> }
      <h1> Profil de {userData.pseudo}</h1>
      <div className="update-container">
        <div className="left-part">
            <h3> Photo de profil</h3>
            <img src = {userData.picture} alt={userData.pseudo}/>
            UPLOAD PIC

        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;
