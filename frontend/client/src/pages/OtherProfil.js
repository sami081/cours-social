import React, { useEffect, useState } from "react";
import LeftNav from "../components/LeftNav";
import axios from "axios";
import { useSelector } from "react-redux";

const OtherProfil = () => {
  const postData = useSelector((state)=> state.posts)
  console.log(postData);
  const usersData = useSelector((state)=>state.users)
  

  const [myData, setMyData] = useState(
    localStorage.getItem("mydata") || "initial value"
  );
  const [pseudo, setPseudo] = useState("");
  


 
  const [image, setImage] = useState();
  // const [postMessage, setPostMessage] = useState();
  // const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [picture, setPicture] = useState();

 useEffect(() => {for(let p = 0; p <usersData.length; p++) {
  if(myData== usersData[p]._id) {
   setPseudo(usersData[p].pseudo);
   setImage(usersData[p].picture)
 
  }
}
// for(let b = 0; b <postData.length; b++) {
//   if(myData== postData[b].userId) {
//    setMessage(postData[b].message);
//    setPicture(postData[b].picture)
  
 
//   }
// }
},[])
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}api/user/${myData}`)
  //     .then((res) => {
  //       setPseudo(res.data.pseudo);
  //       setImage(res.data.picture);
  //       // setPosts(res.data.posts);
  //       return axios
  //         .get(`${process.env.REACT_APP_API_URL}api/user/${myData}/posts`)
  //         .then((res) => {
  //           // setPosts(res.data);
  //           for( let y =0; y < res.data.length; y++) {

  //             setMessage(res.data[y].message);
  //             setPicture(res.data[y].picture)
  //             console.log(res.data);
             
  //           }
  //         });
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  
  return (
    <>
      <div>
        {<LeftNav />}
        <h2>{pseudo}</h2>
        <img src={image} alt="card-pic" className="card-pic" />
      </div>
      <div>
        {/* <p>{posts.map((post)=> {return post.message})}</p> */}
        <p>{message}</p>
    
        <img src={picture} />
      </div>
    </>
  );
};

export default OtherProfil;
