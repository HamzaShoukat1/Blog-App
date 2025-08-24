import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import authService from '../src/Appwrite/auth'
import { Footer,Header } from './Components'
import { Outlet } from 'react-router-dom'
import {login ,logout,setPending} from './Store/AuthSlice'
import { Loaderworking } from './Loader/Loaderworking'
import {Toaster} from 'react-hot-toast'
import useLoader from './Loader/Loader'

function App() {
  const dispatch = useDispatch()
  const authStatus = useSelector((state)=> state.auth.status)
  const status = useSelector(state=> state.posts.status)
  const {loading, setLoading} = useLoader()



  useEffect(() => {
    setLoading(true)
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
  
useEffect(() => {
status !== 'loading' && setLoading(false)
}, [setLoading,status])




  return (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-500'>
      <div className='w-full block'>
        <Header />
        <main>
          <Loaderworking />
          <Outlet />
        </main>
        {status === 'succeeded' && <Footer />}
        <Toaster
          position='top-center'
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
            },
            success: {
              iconTheme: {
                primary: '#4ade80',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default App
