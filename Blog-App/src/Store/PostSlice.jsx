import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import appwriteService from '../Appwrite/config'


export const fetchAllPosts = createAsyncThunk(
  'posts/fetchAllPosts',
  async ()=>{
    const res = await appwriteService.getPosts()
    return res?.documents|| []
  },

)


export const getPostbyId = createAsyncThunk('posts/getPostbyId',
  async(slug)=>{
    const res = await appwriteService.getPost(slug)
    return res 

  }

)
const initialState = {
  allPosts: [],
  currentPost: null,
  status: 'idle', 
  error: null
}

const PostSlice = createSlice({
  name: 'posts',
  initialState, 
  reducers:{
    clearCurrentPost(state){
      state.currentPost = null
    },
  
  },
  extraReducers: (builder)=>{
    builder
    .addCase(fetchAllPosts.pending, (state)=>{
      state.status = 'loading',
      state.error = null

    })
    .addCase(fetchAllPosts.fulfilled,(state,action)=>{
      state.allPosts = action.payload
      state.status = 'succeeded'
    })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.error = action.error.message
        state.status = 'failed'
      })
      .addCase(getPostbyId.pending,(state)=>{
        state.status = 'laoding'
        state.error = null
      })
      .addCase(getPostbyId.fulfilled,(state,action)=>{
        state.status = 'fullfilled'
        state.currentPost = action.payload

      })
      .addCase(getPostbyId.rejected,(state,action)=>{
        state.status = 'failed'
        state.error = action.error.message


      })
  },

  })

  export const {clearCurrentPost} = PostSlice.actions
  export default PostSlice.reducer
