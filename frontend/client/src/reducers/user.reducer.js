import { GET_USER, UPDATE_BIO, UPLOAD_PICTURE } from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
case UPLOAD_PICTURE : 
return {
  ...state,
  picture : action.payload,
}
case UPDATE_BIO : 
return {
  ...state,
  bio : action.payload
}
    default:
      return state;
  }
 }
// import { createSlice } from "@reduxjs/toolkit";

// export const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     userId: null,
//   },
//   reducers: {
//     getUser: (state, { payload }) => {
//       state.user = payload;
//     },
//   },
// });

// export const { getUser } = userSlice.actions;
// export default userSlice.reducer;

