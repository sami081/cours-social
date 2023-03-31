import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../reducers/posts.reducer";
import userReducer from "../reducers/user.reducer";
import usersReducer from "../reducers/users.reducer";

export default configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    posts: postsReducer,
   
  },
});
