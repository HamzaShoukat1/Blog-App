import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  status: 'idle',
  userData: null,
}


const authSlice = createSlice({
  name: "auth",
  initialState,
  
  reducers:{
    setPending:(state)=>{
      state.status = 'pending'

    },
     login: (state,action) =>{
    state.status = 'fulfilled';
    state.userData = action.payload
  },
  logout:(state)=>{
    state.status = 'rejected';
    state.userData = null

  }

  }
 
})




export const {login,logout,setPending} = authSlice.actions;

export default authSlice.reducer;



// 🧠 userData in slice: Why This Is Useful
// By keeping userData in your Redux store:

// You can access the current user's info from anywhere in your app.

// You can show/hide routes, buttons, or pages depending on whether the user is logged in.

// You avoid calling getCurrentUser() again and again.