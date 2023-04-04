import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { deleteComment, editComment } from "../../actions/post.action";
const EditDeleteComment = (comment, postId) => {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const post = useSelector((state) => state.posts);
  console.log(post);

  const dispatch = useDispatch();
  const handleEdit = (e) => {
    e.preventDefault();
    if (text) {
      dispatch(editComment(postId, comment._id, text));
      setText("");
      setEdit(false);
    }
  };
  const handleDelete = ()=> {
   dispatch(deleteComment(postId, comment._id))
  }

  return (
    <div className="edit-comment">
      {edit === false && (
        <span
          onClick={() => {
            setEdit(!edit);
            localStorage.setItem("commentId", comment.comment._id);
            localStorage.setItem("postId", comment.postId);
          }}
        >
          <img src="./img/icons/edit.svg" alt="edit-comment" />
        </span>
      )}
      {edit === true && (
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          <label htmlFor="text" onClick={() => setEdit(!edit)}>
            Editer
          </label>
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            defaultValue={comment.text}
          />
          <div className="btn">
            <span onClick={()=> {
                if(window.confirm('Voulez-vous supprimer ce commentaire ?')) {
                    handleDelete()
                }
            }}>
                <img src="./img/icons/suppr.svg" alt="suppr"/>
            </span>
          </div>
          <input type="submit" value="Valider les modification" />
        </form>
      )}
    </div>
  );
};

export default EditDeleteComment;
