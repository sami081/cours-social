import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, timestampParser } from "../Utils";
import { NavLink } from "react-router-dom";
import { createPost, getPosts } from "../../actions/post.action";

const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [video, setVideo] = useState("");
  const [file, setFile] = useState();

  const userData = useSelector((state) => state.user);
  const postData = useSelector((state) => state.posts);

  const video2 = localStorage.getItem("video");

  const userId = localStorage.getItem("uid");
  const dispatch = useDispatch();
  //   const handlePost = async () => {
  //     if(message || postPicture ||video) {
  // const data = new FormData();
  // // data.append('userId', userData._id)
  // data.append("message", message)
  // if(file) data.append("file", file)
  // data.append('video', video)
  // console.log(FormData);
  // await dispatch(addPost(data));
  // dispatch(getPosts())
  // cancelPost()
  //     } else {
  //         alert('Veuillez ecrire un message')
  //     }
  //   };
  const handlePost = async (e) => {
    e.preventDefault();
    if (message || postPicture || video) {
      const formData = new FormData();
      formData.append("message", message);
      formData.append("video", video);
      if (file) formData.append("file", file);
      await dispatch(createPost(formData));
      dispatch(getPosts());
      cancelPost();
    } else {
      alert("Veuiller ecrire un texte");
    }
  };

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setVideo("");
    localStorage.removeItem("video");
  };

  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
    setVideo("");
    setFile("");
    localStorage.removeItem("video");
  };
  // const handleVideo = () => {
  //   let findLink = message.split(" ");

  //   // for (let i = 0; i < findLink.length; i++) {
  //   //   if (
  //   //     findLink[i].includes("https://www.yout") ||
  //   //     findLink[i].includes("https://yout")
  //   //   ) {
  //      setEmbed (findLink[0].replace("watch?v=", "embed/"));
  //      console.log(embed);
  //      setVideo(embed.split("&")[0]);
  //     //  findLink.splice(0, 1);
  //      setMessage(findLink.join(" "));
  //     setPostPicture("");
  //   //   }
  //   // }
  //   // console.log(embed + "test");
  // };
  // console.log(video + "test");
  // console.log(embed +"test33");
  // // function onReady(event) {
  //   // access to player in all event handlers via event.target
  //   event.target.pauseVideo();
  // }
  // console.log(findLink);
  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);
    const handleVideo = () => {
      let findLink = message.split(" ");
      for (let i = 0; i < findLink.length; i++) {
        if (
          findLink[i].includes("https://www.yout") ||
          findLink[i].includes("https://yout")
        ) {
          let embed = findLink[i].replace("watch?v=", "embed/");
          localStorage.setItem("video", embed.split("&")[0]);
          setVideo(localStorage.getItem("video"));
          console.log(video + "33");
          findLink.splice(i, 1);
          setMessage(findLink.join(" "));
          // setPostPicture("");
        }
      }
    };

    handleVideo();
  }, [userData, message, video]);
  console.log("123" + video2 + "test");

  return (
    <div className="post-container">
      {isLoading ? (
        <img src="./img/icons/chargement.svg" alt="chargement" />
      ) : (
        <>
          <div className="data">
            <p>
              <span>{userData.following ? userData.following.length : 0} </span>{" "}
              Abonnement
              {userData.following && userData.following.length > 1 ? "s" : null}
            </p>
            <p>
              <span>{userData.followers ? userData.followers.length : 0} </span>{" "}
              Abonné
              {userData.followers && userData.followers.length > 1 ? "s" : null}
            </p>
          </div>
          <NavLink exact to="/profil">
            <div className="user-info">
              <img src={userData.picture} alt="user-img" />
            </div>
          </NavLink>
          <div className="post-form">
            <textarea
              name="message"
              id="message"
              placeholder="Quoi de neuf"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              onClick={() => localStorage.removeItem("video")}
            />
            {message || postPicture || video.length > 20 ? (
              <>
                <li className="card-container">
                  <div className="card-left">
                    <img src={userData.picture} alt="user-pic" />
                  </div>
                  <div className="card-right">
                    <div className="card-header">
                      <div className="pseudo">
                        <h3>{userData.pseudo}</h3>
                      </div>
                      <div>
                        <p>{timestampParser(Date.now())}</p>
                      </div>
                    </div>
                    <div className="content">
                      <p>{message}</p>
                      {/* <img src={postPicture} alt="" /> */}
                      {!video2 &&
                      postPicture &&
                      file.name.split(".").pop() != "mp4" ? (
                        (console.log(file.name.split(".").pop()),
                        (
                          <>
                            {" "}
                            <img src={postPicture} alt="" />
                          </>
                        ))
                      ) : (
                        <>
                          {!video2  && postPicture ? (
                            <video width="640" height="360" controls>
                              <source src={postPicture} type="video/mp4" />
                              Votre navigateur ne supporte pas la lecture de
                              vidéos HTML5.
                            </video>
                          ) : (
                            (console.log(video2),
                            (
                              <>
                                <iframe
                                  src={video2}
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  title={video2}
                                ></iframe>
                              </>
                            ))
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </li>
              </>
            ) : null}
            <div className="footer-form">
              <div className="icon">
                {isEmpty(video2) && (
                  <>
                    <img src="./img/icons/picture.svg" alt="img" />
                    <input
                      type="file"
                      id="file-upload"
                      name="file"
                      // accept=".jpg, .jpeg,.png"
                      onChange={(e) => handlePicture(e)}
                      onClick={() => {
                        localStorage.removeItem("video");
                      }}
                    />
                  </>
                )}
                {video && (
                  <button
                    onClick={() => {
                      setVideo("");
                      localStorage.removeItem("video");
                    }}
                  >
                    Supprimer la video
                  </button>
                )}
              </div>
              <div className="btn-send">
                {message || postPicture || video.length > 20 ? (
                  <button className="cancel" onClick={cancelPost}>
                    Annuler message
                  </button>
                ) : null}
                <button className="send" onClick={handlePost}>
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewPostForm;
