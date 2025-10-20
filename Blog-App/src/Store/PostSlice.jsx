import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import appwriteService from '../Appwrite/config'


export const fetchAllPosts = createAsyncThunk(
  'posts/fetchAllPosts',
  async (_, thunkAPI)=>{
    await new Promise((resolve)=> setTimeout(resolve,600))
    try {
       const res = await appwriteService.getPosts()
    //  console.log("Fetched posts:", res); 

    return res?.documents|| []
      
    } catch (error) {
      thunkAPI.rejectWithValue(error.message || 'failed to fetch post')
      
    }
   
  },

)


export const getPostbyId = createAsyncThunk(
  'posts/getPostbyId',
  async(slug,_,thunkAPI)=>{
   try {
     const res = await appwriteService.getPost(slug)
    return res 
    
   } catch (error) {
    thunkAPI.rejectWithValue(error.message || "failed to fetch single post")
    
   }

  }

)
export const getFileView = createAsyncThunk(
  'posts/getfileview',
  async(fileId,_,thunkAPI)=>{
   try {
     const res = await appwriteService.getFileView(fileId)
    return {fileId,res}
   } catch (error) {
    thunkAPI.rejectWithValue(error.message || "failed to fetch  file view")
    
   }

    


  }

)


const initialState = {
  allPosts: [],
  currentPost: null,
  fileview: {},
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
        state.status = 'loading'
        state.error = null
      })
      .addCase(getPostbyId.fulfilled,(state,action)=>{
        state.status = 'succeeded'
        state.currentPost = action.payload

      })
      .addCase(getPostbyId.rejected,(state,action)=>{
        state.status = 'failed'
        state.error = action.error.message


      })
      .addCase(getFileView.fulfilled,(state,action)=>{
        const {fileId,res} = action.payload
        state.fileview[fileId] = res
        
      })
  },

  })

  export const {clearCurrentPost,fileView} = PostSlice.actions
  export default PostSlice.reducer
