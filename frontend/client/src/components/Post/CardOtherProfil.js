import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dateParser, isEmpty } from "../Utils";
import CardComment from "./CardComment";

const CardOtherProfil = () => {
  const postData = useSelector((state) => state.posts);
  const Id = localStorage.getItem("profilId");
  const [post, setPost] = useState([]);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    for (let i = 0; i < postData.length; i++) {
      if (Id == postData[i].userId) {
        setPost(postData);
        console.log("les post:", post);
      } else {
        console.log("non");
      }
    }
  }, [postData, Id, post]);
  return (
    <div className="post-container">
      <h2>Les Posts : </h2>
      <div className="all-post-container">
        <li className="card" key={post._id}>
          <>
            {!isEmpty(post[0]) && 
              post.map((el) => { 
                console.log("tert");
                if(el.userId == Id) {
                    console.log(Id);

                    return (
                        <>
                              <h5>{dateParser(el.createdAt)}</h5>
                    <p>{el.message}</p>

                    {el.picture && el.picture.split(".").pop() != "mp4" ? (
                        <img src={el.picture} alt="card-img" />
                        ) : (
                            <>
                        {el.picture && el.picture.split(".").pop() == "mp4" ? (
                            <>
                            <video width="460" height="360" controls>
                              <source src={el.picture} type="video/mp4" />
                            </video>
                          </>
                        ) : (
                            <>
                            {el.video ? (
                                <>
                                <iframe
                                  src={el.video}
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  title={el.video}
                                  ></iframe>
                              </>
                            ) : null}
                          </>
                        )}
                      </>
                    )}
                <div className=".comment-icon">
                  <img
                    onClick={() => setShowComments(!showComments)}
                    src="./img/icons/message1.svg"
                    alt="comment"
                  />
                  <span>{el.comments.length}</span>
                  {showComments && <CardComment post={el} />}
                </div>
                  </>
                );
            }
              })}
          </>
        </li>
      </div>
    </div>
  );
};

export default CardOtherProfil;
