import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useLoader from "../Loader/Loader";
import { AnimatePresence, motion } from "framer-motion";
import '../../src/index.css'
export const Loaderworking =  ()=>{
  
  const location = useLocation()

  const {loading, setLoading} = useLoader()
  

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(()=>{
      setLoading(false)

    },400)
    return ()=>{
      clearTimeout(timer)
    }
   
  }, [location])
 
   useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
  }, [loading]);
  return (
  
    <AnimatePresence>
      {loading && (
          <motion.div
          key='loader'
      className="loader-wrapper"
      initial={{opacity:0}}
      animate={{opacity: 1}}
      exit={{opacity:0}}
      transition={{duration:0.4, ease: 'easeOut'}}
      >
     <div className="loader"></div>
      </motion.div>
      )}
    
    </AnimatePresence>
  )
  
};
  
  






export default Loaderworking