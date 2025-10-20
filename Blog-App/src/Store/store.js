import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../Store/AuthSlice'
import PostReducer from '../Store/PostSlice'

const store = configureStore({
  reducer:{
    auth: authReducer,
    posts: PostReducer
    
  }
});



export default store