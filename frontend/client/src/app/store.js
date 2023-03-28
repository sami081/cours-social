import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/user.reducer";
import usersReducer from "../reducers/users.reducer"

export default configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
  },
});
