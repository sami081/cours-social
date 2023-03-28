 import axios from "axios";

export const GET_USERS = "GET_USERS";

export const getUsers = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user`)
      .then((res) => {
        dispatch({ type: GET_USERS, payload: res.data });
        console.log(res.data);
      })
      .catch((err)=> console.log(err))
  };
};
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// export const getUsers = createAsyncThunk("getUsers", async (_, thunkAPI) => {
//   axios
//     .get(`${process.env.REACT_APP_API_URL}/api/user`)
//     .then((res) => 
    
//     console.log(res))
// });

// export const usersSlice = createSlice({
//   name : "users",
//   initialState: {
//     usersData : {}
//   }, 
//   reducers : {
//     getUsersSuccess:(state, {payload}) => {
//       state.usersData = payload
//     }
//   }
// })
// console.log(usersSlice);
// export const {
//   getUsersSuccess,
  
// } = usersSlice.actions;
// export default usersSlice.reducer;
