import React, { useContext, useEffect, useState } from 'react';
import { UidContext } from '../AppContext';
import { useSelector } from 'react-redux';
import { dateParser, isEmpty } from '../Utils';
import CardComment from './CardComment';

const CardUser = () => {
    const uid = useContext(UidContext);
    console.log(uid);
  const postData = useSelector((state)=> state.posts)
  console.log(postData);
  const [showComments, setShowComments] = useState(false);
  
  const [post, setPost] = useState("")
  

  useEffect(()=> {
    for(let i=0;i<postData.length;i++) {
        if(uid == postData[i].userId) {
            setPost(postData);
            console.log( "mes post", post);
        } else {
            console.log("non");
        }
    } 

  },[postData, post, uid])
    return (
        <div className="posts-user">
      <h2>Les Posts : </h2>
      <div className="all-post-container">
        <li className="card" key={post._id}>
          <>
            {!isEmpty(post[0]) && 
              post.map((el) => { 
                console.log("tert");
                if(el.userId == uid) {
                    console.log(uid);

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

export default CardUser;