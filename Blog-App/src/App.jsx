import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import authService from '../src/Appwrite/auth'
import { Footer,Header } from './Components'
import { Outlet } from 'react-router-dom'
import {login ,logout,setPending} from './Store/AuthSlice'
import { Loaderworking } from './Loader/Loaderworking'
import {Toaster} from 'react-hot-toast'

function App() {
  const dispatch = useDispatch()
  const authStatus = useSelector((state)=> state.auth.status)



  useEffect(() => {
    dispatch(setPending())
    authService.getCurrentUser()
    .then((userData)=>{
          console.log("User detected on load:", userData)

      if(userData){
        dispatch(login(userData)) //We tell Redux: "The user is logged in."
      }else{
        dispatch(logout())  
      }
    
    })
    
  }, [dispatch])

  return authStatus !== 'pending' ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-500'>
      <div className='w-full block'>
        <Loaderworking  />
        <Header />
        <main>
          <Outlet />
        </main>
       {   <Footer  />}
       <Toaster
       position='top-center'
       toastOptions={{
        duration: 3000,
        style:{
          background: '#333',
          color: '#fff',
        },
        success:{
          iconTheme: {
            primary: '#4ade80',
            secondary: '#fff',
          },

         
        }
       }}

        />
      </div>
    </div>

  ) : (
    <div className='flex justify-center items-center h-screen text-white text-lg'>
      loading...
    </div>
  )

  
  
  
 
}

export default App
