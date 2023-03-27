import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./styles/index.scss";
import {Provider} from "react-redux"
// import { configureStore } from "@reduxjs/toolkit";
// import { applyMiddleware, createStore } from 'redux';
//import {composeWithDevTools} from 'redux-devtools-extension'
// import thunk from 'redux-thunk';
// import logger from "redux-logger"
// import rootReducer from "./reducers"
import store from "./app/store"





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <Provider store = {store}>
    <App />
    </Provider>

);

