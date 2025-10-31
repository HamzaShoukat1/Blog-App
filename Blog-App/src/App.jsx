import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import authService from '../src/Appwrite/auth'
import { Footer,Header } from './Components'
import { Outlet } from 'react-router-dom'
import {login ,logout,setPending} from './Store/AuthSlice'
import { Loaderworking } from './Loader/Loaderworking'
import { useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import {Toaster} from 'react-hot-toast'

function App() {
 
  const dispatch = useDispatch()



  useEffect(() => {
    dispatch(setPending())
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login(userData)) //We tell Redux: "The user is logged in."
     
      }else{
        dispatch(logout())  
      }
    
    })
    
  }, [dispatch])

   const location = useLocation()
    const hideHeader = ['/login','/signup'].includes(location.pathname)

 
  return (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-500'>
      <div className='w-full block'>
          <Loaderworking />
       {!hideHeader &&  <Header />}
        <main>
          <Outlet />
        </main>
        { <Footer />}
        <Toaster
          position='top-center'
        />
      </div>
    </div>
  );
}

export default App
