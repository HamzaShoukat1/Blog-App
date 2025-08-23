import React, {useState} from 'react'
import {data, Link,useNavigate} from 'react-router-dom'

import {login as StoreLogin} from '../../Store/AuthSlice'
import {Button,Logo,Input} from '../index'
import { useDispatch } from 'react-redux'
import authService from '../../Appwrite/auth'
import { useForm } from 'react-hook-form'
import { current } from '@reduxjs/toolkit'


function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm()
  const [error, setError] = useState("")

  const login = async(data)=>{
    setError("")
    try {
      const currentUser = await authService.getCurrentUser();
    // If there's already a logged-in user, navigate directly
    if (currentUser) {
      dispatch(StoreLogin(currentUser));
      navigate('/');
      return;
    }
      

      const session  = await authService.login(data)
      if(session){
        const userData = await authService.getCurrentUser()
        if(userData) dispatch(StoreLogin(userData)) //store updates the user data in Redux
          navigate('/')
      }
      
    } catch (error) {
      setError(error.message)
      
    }
  }
  return (
    <div className='flex items-center justify-center w-full'>
      <div className={`mx-auto w-full max-w-[420px] bg-gray-100 rounded-xl p-10 border border-black/100`}>
      {/* //Logo */}
      <div className='mb-2 flex justify-center'>
        <span className=' w-full max-w-[100px]'>
          <Logo width='100%' />
        </span>

      </div>
      {/* //---- */}
      <h2  className='text-center text-2xl font-bold'>Sign in to your account</h2>
      <p className='mt-2 text-center text-base  text-black/60'>
      Don't have any account?&nbsp;
      <Link
      to="/signup"
      className='font-medium text-primary transition-all mr-1 duration-200 hover:underline'
      > 
      Sign up

      </Link>
      </p>
     

        <form onSubmit={handleSubmit(login)} className='pt-4'>
          <div className='space-y-2'>
            <Input
            label="email:"
            type='email'
            placeholder="Enter your email"
            {...register("email", {
              required: "email is required",
              // maxLength:20,
            pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please Enter a Valid Email Address",
          },
            })}
             />
             {errors.email && (
              <p className='text-red-500 text-sm'>{errors.email.message}</p>
             )
              }
             <Input 
             label="Password"
             type='password'
             placeholder='Enter Your Password'
             {...register('password',{
              required: "password is required",
              // maxLength:20,
               pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message:
        "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character",
    },

             })}
             />
                 {errors.password && (
  <p className="text-red-500  text-sm">{errors.password.message}</p>
)}
             <Button
             type='submit'
             className='w-full cursor-pointer'
             disabled={isSubmitting}


             >
              
              {isSubmitting ? 'waiting..' : 'Sign in'}

          

             </Button>
         

          </div>

        </form>



      </div>
      
    </div>
  )
}

export default Login

