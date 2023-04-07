import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./styles/index.scss";
import {Provider} from "react-redux"

// import rootReducer from "./reducers";
// import { getUsers } from "./actions/users.actions";
// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './reducers/user.reducer';
// import { configureStore } from "@reduxjs/toolkit";
// import { applyMiddleware, createStore } from 'redux';
//import {composeWithDevTools} from 'redux-devtools-extension'
// import thunk from 'redux-thunk';
// import logger from "redux-logger"
// import rootReducer from "./reducers"
import store from "./app/store"
import { getUsers } from './actions/users.actions';
import { getPosts } from './actions/post.action';

// const store = configureStore({
//     reducer: {
//       user: userReducer,
//       users:userReducer,
//     },
//   });

//     // composeWithDevTools(applyMiddleware(thunk))
  
  
   store.dispatch(getUsers());
   store.dispatch(getPosts())
//   store.dispatch(getPosts());



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <Provider store = {store}>
    <App />
    </Provider>

);

