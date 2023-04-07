import React, { useEffect, useState } from "react";
import LeftNav from "../LeftNav";
import { useSelector } from "react-redux";
import { dateParser } from "../Utils";
import CardOtherProfil from "../Post/CardOtherProfil";
import FollowHandler from "./FollowHandler";

const Other = () => {
  const userId = localStorage.getItem("profilId");
  const usersData = useSelector((state) => state.users);
  const [pseudo, setPseudo]= useState("")
  const [picture, setPicture] = useState("")
  const [email, setEmail] = useState("")
  const [bio, setBio] = useState("")
  const [created, setCreated] = useState("")
  const [abonné, setAbonnés] = useState("")
  const [Abonnement, setAbonnement] = useState("")
  console.log(usersData);
  console.log(userId);
useEffect(()=> {
    for (let i=0; i< usersData.length; i++){
        if(usersData[i]._id==userId) {
            setPseudo(usersData[i].pseudo)
            setEmail(usersData[i].email)
            setPicture(usersData[i].picture)
            setBio(usersData[i].bio)
            setCreated(usersData[i].createdAt)
            setAbonnés(usersData[i].followers.length)
            setAbonnement(usersData[i].following.length)
        } else {
            console.log("non");
        }
    }
})
  return (
 <section className="other-profil-section">
    <LeftNav/>
    <aside className="information-other-profil">
   
        <h2>Profil de {pseudo}</h2>
        <img src={picture} alt="user-pic"/>
        <h3>{email}</h3>
        <p>Briographie : {bio}</p>
        <p>Membre depuis le : {dateParser(created)}</p>
        <h4>Abonné{abonné && abonné > 1 ? "s" : null} : {abonné}</h4>
        <h4>Abonnement{Abonnement && Abonnement > 1 ? "s" : null}: {Abonnement}</h4>
    
       
    </aside>

    <CardOtherProfil/>
 </section>
  );
};

export default Other;
