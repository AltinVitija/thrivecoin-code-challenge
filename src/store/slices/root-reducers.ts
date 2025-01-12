import { combineReducers } from "@reduxjs/toolkit";
import postSlice from "./post/postSlice";

export const rootReducer = combineReducers({
  post: postSlice,
});
