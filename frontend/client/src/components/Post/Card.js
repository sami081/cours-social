import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FollowHandler from "../Profil/FollowHandler";
import { dateParser, isEmpty } from "../Utils";
import LikeButton from "./LikeButton";
import { getPosts, updatePost } from "../../actions/post.action";
import DeleteCard from "./DeleteCard";
import CardComment from "./CardComment";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const usersData = useSelector((state) => state.users);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post._id, textUpdate));
    }
    setIsUpdated(false);
  };

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);
  return (
    <li className="card-container" key={post._id}>
      {isLoading ? (
        <img src="./img/icons/chargement.svg" alt="chargement" />
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user._id == post.userId) return user.picture;
                    else return null;
                  })
                  .join("")
              }
              alt="user-pic"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user._id == post.userId) return user.pseudo;
                        else return null;
                      })
                      .join("")}
                </h3>

                {post.userId != userData._id && (
                  <FollowHandler idToFollow={post.data} type={"card"} />
                )}
              </div>
              <span>{console.log(userData)}</span>
              <span>{dateParser(post.createdAt)}</span>
              {isUpdated === false && <p>{post.message}</p>}
              {isUpdated && (
                <div className="update-post">
                  <textarea
                    defaultValue={post.message}
                    onChange={(e) => setTextUpdate(e.target.value)}
                  />
                  <div className="button-container">
                    <button className="btn" onClick={updateItem}>
                      Valider les modification
                    </button>
                  </div>
                </div>
              )}
              {post.picture && (
                <img src={post.picture} alt="card-pic" className="card-pic" />
              )}
              {userData._id == post.userId && (
                <div className="button-container">
                  <div onClick={() => setIsUpdated(!isUpdated)}>
                    <img src="./img/icons/edit.svg" alt="edit" />
                  </div>
                  <DeleteCard id={post._id} />
                </div>
              )}
              <div className="card-footer">
                <div className=".comment-icon">
                  <img
                    onClick={() => setShowComments(!showComments)}
                    src="./img/icons/message1.svg"
                    alt="comment"
                  />
                  <span>{post.comments.length}</span>
                </div>
                <LikeButton post={post} />
                <img src="./img/icons/share.svg" alt="share" />
              </div>
              {showComments && <CardComment post={post} />}
            </div>
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
