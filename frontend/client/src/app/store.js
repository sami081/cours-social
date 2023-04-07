import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../reducers/posts.reducer";
import userReducer from "../reducers/user.reducer";
import usersReducer from "../reducers/users.reducer";
import allPostsReducer from "../reducers/allPosts.reducer"
import trendingReducer from "../reducers/trending.reducer"

export default configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    posts: postsReducer,
    allPosts : allPostsReducer,
    trending : trendingReducer
   
  },
});
