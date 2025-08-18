import { createContext,useContext } from "react";
export const LoaderContext  = createContext()
export const LoaderProvider = LoaderContext.Provider

export default function   useLoader (){
  return useContext(LoaderContext)



}
