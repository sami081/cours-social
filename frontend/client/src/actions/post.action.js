import axios from "axios";
import {  createSlice } from "@reduxjs/toolkit";

// posts
export const GET_POSTS = "GET_POSTS";
export const ADD_POSTS = "ADD_POSTS";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

// comments
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";


export const getPosts = (num) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post`)
      .then((res) => {
        const array = res.data.slice(0, num).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        dispatch({ type: GET_POSTS, payload: array
        });
      })
      .catch((err) => console.log(err));
  };
};

// export const addPost = (data)=> {
//   const userId = localStorage.getItem('uid')
//   console.log(data);
//   return (dispatch) => {
//     return axios
//       .post(`${process.env.REACT_APP_API_URL}api/post/${userId}`, data)
      
    
//   };
// }
// export const postSlice = createSlice({
//   name: "posts",
//   initialState: {
//     postsData: [],
//   },
//   reducers : {
//   createPost: (state, { payload }) => {
//     state.postsData.push(payload);
//   },
// }
// })


export const createPost = (formData) => async (dispatch) => {
  const userId = localStorage.getItem('uid')
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}api/post/${userId}`, formData, {
      // headers: {
      //   'Content-Type': 'multipart/form-data'
      // }
    });
    dispatch({ type: 'CREATE_POST_SUCCESS', payload: res.data });
  } catch (err) {
    dispatch({ type: 'CREATE_POST_FAIL', payload: err.message });
  }
};


export const likePost = (postId, userId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/like-post/` + postId,
      data: { userId },
    })
      .then((res) => {
        dispatch({ type: LIKE_POST, payload: { postId, userId } });
      })
      .catch((err) => console.log(err));
  };
};
export const unlikePost = (postId, userId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/unlike-post/` + postId,
      data: { userId },
    })
      .then((res) => {
        dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
      })
      .catch((err) => console.log(err));
  };
};

export const updatePost = (postId, message) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      data: { message },
    })
      .then((res) => {
        dispatch({ type: UPDATE_POST, payload: { message, postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const deletePost = (postId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
    
    })
      .then((res) => {
        dispatch({ type: DELETE_POST, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const addComment = (postId,commenterId, text, commenterPseudo ) => {
  return (dispatch) => {
    return axios ({
      method : "patch",
      url:`${process.env.REACT_APP_API_URL}api/post/comment-post/${postId}`,
      data : {commenterId, text, commenterPseudo}
    })
    .then((res)=> {
      dispatch({type: ADD_COMMENT, payload : {postId}})
    })
    .catch((err) => console.log(err));
  }
}
export const editComment = (postId, commentId, text) => {
 const postedId = localStorage.getItem("postId")
 const commentedId = localStorage.getItem("commentId")

  return (dispatch) => {
    return axios ({
      method : "put",
      url:`${process.env.REACT_APP_API_URL}api/post/${postedId}/edit-comment/${commentedId}`,
      data : {commentedId, text}
    })
    .then((res)=> {
      dispatch({type: EDIT_COMMENT, payload : {postedId, commentedId, text}})
    })
    .catch((err) => console.log(err));
  }
}

export const deleteComment = (postId, commentId) => {
  const postedId = localStorage.getItem("postId")
  const commentedId = localStorage.getItem("commentId")
  return (dispatch) => {
    return axios ({
      method : "delete",
      url:`${process.env.REACT_APP_API_URL}api/post/${postedId}/delete-comment/${commentedId}`,
   
    })
    .then((res)=> {
      dispatch({type: DELETE_COMMENT, payload : {postedId, commentedId}})
    })
    .catch((err) => console.log(err));
  }
}
// export const {
 
//   createPost,
  
  
// } = postSlice.actions;
// export default postSlice.reducer;