import React, {useState} from "react";
import authService from "../../Appwrite/auth";
import { useNavigate,Link,  } from "react-router-dom";
import {Button,Input,Logo} from '../index'
import { login } from "../../Store/AuthSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
 function Signup(){
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const {register, handleSubmit,formState:{errors,isSubmitting}} = useForm()

  

  const create = async(data)=>{
    setError("")
    try {
      const session = await authService.createAccount(data)

      if(session) {
        toast.success("Account Created Successfully",{
          position:'top-right'
        })
        const userData = await authService.getCurrentUser()
        
        if(userData) dispatch(login(userData))
          
          navigate('/')

        // navigate("/login")


}
    } catch (error) {
      setError(toast.error("email already exist",{
        position:"top-right"
      }))
    }
  }










  return (
    <div className="flex items-center justify-center">

      <div className={`mx-auto w-full max-w-md bg-gray-100 rounded-xl p-10 border border-black/100`}>
      {/* //Logo */}
      <div className="mb-2 justify-center">
        <span className="inline-block w-full  max-w-[100px]">
          <Logo width="100%" />

        </span>
      </div>
      {/* // */}

        <h2  className='text-center text-2xl font-bold'>Sign up to create account</h2>
            <p className='mt-2 text-center text-base  text-black/60'>
            Don't have any account?&nbsp;
            <Link 
            to="/login"
            className='font-medium text-base transition-all duration-200 hover:underline'
            > 
           Login
            </Link>
            </p>
           

        <form onSubmit={handleSubmit(create)}>
          
          <div className="space-y-1">
            <Input 
            label='Full Name'
            placeholder='Enter Your Full Name'
            {...register("name",{
              required:"Full name is required"

            })}
            />
              {errors.name && (
              <p className='text-red-500  text-sm'>{errors.name.message}</p>
             )
              }
              <Input
                        label="Email"
                        type='email'
                        placeholder="Enter your email"
                        {...register("email", {
                          required: "Email is required", //auto works when you press enter
                          // maxLength:13,
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
              label='password'
              type='password'
              placeholder='password'
              {...register('password',{
                required:"password is required",
                //  maxLength:8,
                   pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message:
        "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character",
    },

              })}
              />
                 {errors.password && (
              <p className='text-red-500 text-sm'>{errors.password.message}</p>
             )
              }
              <Button

              type="submit"
              className="w-full font-semibold cursor-pointer"
              >
                {isSubmitting ? 'creating' : 'createAccount'}
              </Button>
             



          </div>

        </form>



      </div>
    </div>
  )

 }

 export default Signup


