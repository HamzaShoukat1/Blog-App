import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useLoader from "../Loader/Loader";
export const Loaderworking =  ()=>{
  
  const location = useLocation()

  const {loading, setLoading} = useLoader()

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(()=>{
      setLoading(false)

    },300)
    return ()=>{
      clearTimeout(timer)
    }
   
  }, [location])
  useEffect(() => {
   if(loading){
    document.body.style.overflow = 'hidden'
   } else{
    document.body.style.overflow = ''
   }
  }, [loading])
  
  





}
// export default Loaderworking
export default Loaderworking