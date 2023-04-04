import {
  
  DELETE_COMMENT,
  DELETE_POST,
  EDIT_COMMENT,
  GET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  UPDATE_POST,
} from "../actions/post.action";

const initialState = {};
export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });;

 
    case LIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likers: [action.payload.userId, ...post.likers],
          };
        }
        return post;
      });

    case UNLIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likers: post.likers.filter((id) => id !== action.payload.userId),
          };
        }
        return post;
      });
    case UPDATE_POST:
      return state.map((post) => {
        if (post._id == action.payload.postId) {
          return {
            ...post,
            message: action.payload.message,
          };
        } else return post;
      });
    case DELETE_POST:
      return state.filter((post) => post._id != action.payload.postId);
    case EDIT_COMMENT:
      return state.map((post) => {
        if (post._id == action.payload.postedId) {
          return {
            ...post,
            comments: post.comments.map((comment) => {
              if (comment._id == action.payload.commentedId) {
                return {
                  ...comment,
                  text: action.payload.text,
                };
              } else {
                return comment;
              }
            }),
          };
        } else {
          return post;
        }
      });
    case DELETE_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.postedId) {
          return {
            ...post,
            comments: post.comments.filter(
              (comment) => comment._id != action.payload.commentedId
            ),
          };
        } else return post;
      });

    default:
      return state;
  }
}
