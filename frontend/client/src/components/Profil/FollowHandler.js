import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../actions/user.actions";
import { isEmpty } from "../Utils";

const FollowHandler = ({ idToFollow, idToUnFollow, type }) => {
  const userData = useSelector((state) => state.user);
  const [isFollowed, setIsFollowed] = useState(false);
  const dispatch = useDispatch();

  const handleFollow = () => {
    dispatch(followUser(userData._id, idToFollow));
    setIsFollowed(true)
  };

  const handleUnfollow = () => {
    dispatch(unfollowUser(userData._id, idToFollow));
    setIsFollowed(false);
  };

  useEffect(() => {
    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow)) {
        setIsFollowed(true);
      } else setIsFollowed(false);
    }
  }, [userData, idToFollow]);
  return (
    <>
    {isFollowed && !isEmpty(userData) && (

        <span onClick={handleUnfollow}>
          
        {type ==="suggestion" && <button className="unfollow-btn">se désabonné</button>}
{type === "card" && <img src="./img/icons/checked.svg" alt="checked"/>}
      </span>
          )}
          {isFollowed === false && !isEmpty(userData) &&  (
               <span onClick={handleFollow}>
              {type === "suggestion" && <button className="unfollow-btn">s'abonné</button>}
              {type === "card" && <img src="./img/icons/check.svg" alt="check"/>}
             </span>
          )}
    </>
  );
};

export default FollowHandler;
