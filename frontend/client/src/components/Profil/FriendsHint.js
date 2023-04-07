// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { isEmpty } from "../Utils";
// import FollowHandler from "./FollowHandler";

// const FriendsHint = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [playOnce, setPlayOnce] = useState(true);
//   const FriendsHint = []
//   const userData = useSelector((state) => state.user);
//   const usersData = useSelector((state) => state.users);

//   useEffect(() => {
//     const notFriendList = () => {
//         let array = [];
//       usersData.map((user) => {
//         if (user._id != userData._id && !user.followers.includes(userData._id))
//           return array.push(user._id);
//       });
//       array.sort(() => 0.5 - Math.random());
//    localStorage.setItem("Friends", array);
//    FriendsHint.push(localStorage.getItem("Friends"))
     
//       console.log("Friends:", FriendsHint);
      
//     };
//     if (playOnce && !isEmpty(usersData[0]) && !isEmpty(userData._id)) {
//       notFriendList();
//       setIsLoading(false);
//       setPlayOnce(false);
//     }
//   }, [usersData, userData, playOnce, FriendsHint]);

//   return (
//     <div className="get-friends-container">
//         <h4> Suggestions</h4>
//         {isLoading ? (

//             <div className="icon">
//                <img src="./img/icons/chargement.svg" alt="chargement" />
//             </div>
//         ):(
//             <ul>
//                 {FriendsHint && FriendsHint.map((user) => {
//                     console.log(usersData);
//                 })}
//             {/* {FriendsHint &&
//               FriendsHint.map((user) => {
//                 console.log("tt",user);
//                 for (let i = 0; i < usersData.length; i++) {
//                   if (user == usersData[i]._id) {
//                     console.log(user);
//                     return (
//                       <li className="user-hint" key={user}>
//                         <img src={usersData[i].picture} alt="user-pic" />
//                         <p>{usersData[i].pseudo}</p>
//                         <FollowHandler
//                           idToFollow={usersData[i]._id}
//                           type={"suggestion"}
//                         />
//                       </li>
//                     );
//                   }
//                 }
//               })} */}
//           </ul>
//         ) }
//     </div>
//   );
// };

// export default FriendsHint;
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils";
import FollowHandler from "./FollowHandler";
import { NavLink } from "react-router-dom";

const FriendsHint = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(true);
  const [friendsHint, setFriendsHint] = useState([]);
  const userData = useSelector((state) => state.user);
  const usersData = useSelector((state) => state.users);

  useEffect(() => {
    const notFriendList = () => {
      let array = [];
      usersData.map((user) => {
        if (user._id !== userData._id && !user.followers.includes(userData._id))
          return array.push(user._id);
      });
      array.sort(() => 0.5 - Math.random());
      // if (window.innerHeight > 780) {
      //   array.length = 5;
      // } else if (window.innerHeight > 720) {
      //   array.length = 4;
      // } else if (window.innerHeight > 615) {
      //   array.length = 4;
      // } else if (window.innerHeight > 540) {
      //   array.length = 3 ;
      // } else {
      //   array.length = 3;
      // }
      array.length = 3
      setFriendsHint(array);
    };

    if (playOnce && !isEmpty(usersData[0]) && !isEmpty(userData._id)) {
      notFriendList();
      setIsLoading(false);
      setPlayOnce(false);
    }
  }, [usersData, userData, playOnce]);

  return (
    <div className="get-friends-container">
      <h4>Suggestions</h4>
      {isLoading ? (
        <div className="icon">
          <i className="fas fa-spinner fa-pulse"></i>
        </div>
      ) : (
        <ul>
          {friendsHint &&
            friendsHint.map((user) => {
              for (let i = 0; i < usersData.length; i++) {
                if (user === usersData[i]._id) {
                  return (
                    <li className="user-hint" key={user}>
                      <img src={usersData[i].picture} alt="user-pic" />
                      <NavLink exact to ="/otherProfil">
                      <p onClick={()=> localStorage.setItem("profilId", usersData[i]._id)}>{usersData[i].pseudo}</p>
                      </NavLink>
                      <FollowHandler
                        idToFollow={usersData[i]._id}
                        type={"suggestion"}
                      />
                    </li>
                  );
                }
              }
            })}
        </ul>
      )}
    </div>
  );
};

export default FriendsHint;