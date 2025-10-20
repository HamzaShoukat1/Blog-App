import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../Appwrite/auth'
import {logout }from '../../Store/AuthSlice'
import { useNavigate } from 'react-router-dom'
import Logoutconform from '../../Components/Popups/Logoutconfirm'

function LogoutBtn() {
  const [showConfirm, setShowConfirm] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutHandler = ()=>{
    authService.logout().then(()=>{
      dispatch(logout())
      navigate('/login')


    }).catch((error)=>{
      console.log("error in logoutBtn",error)
    })  
  }


const handleDelete = ()=>{
  setShowConfirm(true)
}
const handleCancel = ()=>{
  setShowConfirm(false)
}
const handleConfirm = ()=>{
  logoutHandler() 
  setShowConfirm(false)
}
  
  
  return (
   <>
      {/* Logout button that opens the confirmation modal */}
      <button
      onClick={handleDelete}
        className='inline-block  px-3 py-2 mt-1 font-semibold bg-black/100   text-base text-white rounded-xs duration-200  cursor-pointer'
      >
        Logout
      </button> 
      
      <Logoutconform
      open={showConfirm}
      onClose={handleCancel}
      onConfirm={handleConfirm}
    
       />




   
    </>
  ) 
}

export default LogoutBtn
