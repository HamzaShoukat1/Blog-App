import { useState } from "react";
import { LoaderProvider } from "./Loader";
import  {Loader}  from "../Loader/Loader.jsx";
import React from "react";
export const  Loaderwrapper = ({children})=>{
  const [loading, setLoading] = useState(false)


  return (
    <LoaderProvider value={{loading,setLoading}}>
      

      {loading && <Loader />}
      {children}

    </LoaderProvider>
  )
}
