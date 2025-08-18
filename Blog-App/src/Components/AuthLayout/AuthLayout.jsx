import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children, authentication = true}){

  const navigate = useNavigate()
  const authStatus = useSelector((state)=> state.auth.status)

  
  useEffect(() => {
    const isLogedin = authStatus === 'fulfilled'
    // todo make it easy
    // if(authStatus === true){
    //   navigate('/')

    // }
    // else if(authStatus === false){
    //   navigate("/login")
    // }

  if(authentication && !isLogedin){
    navigate('/login')  // User is not authenticated, redirect to login
  } else if(!authentication && isLogedin){ 
    navigate('/')       // User is authenticated but shouldn't access this page, redirect to home
  }
}, [authStatus, navigate, authentication])

 if (authStatus === 'idle' || authStatus === 'pending') {
    return <h1>Loading...</h1>;
  }


  return  <>{children}</>

}


