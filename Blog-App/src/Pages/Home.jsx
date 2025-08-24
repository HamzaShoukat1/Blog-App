import React ,{useState,useEffect}from 'react'
import appwriteService from '../Appwrite/config'
import { Container } from '../Components'
import PostCard from '../Components/Postcard/PostCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllPosts } from '../Store/PostSlice'
import {  motion } from 'framer-motion';

function Home() {

  const dispatch = useDispatch()
  const {allPosts,status} = useSelector(state=>state.posts)
const latestPosts = [...allPosts]
  .sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt))
  .slice(0, 8)

  
  

  useEffect(() => {
    if(status === 'idle'){

      dispatch(fetchAllPosts())
    }
  }, [dispatch],status)
    if (status === 'loading') return <p className="text-center mt-8">...</p>

if(allPosts.length === 0){
  return (
    <div className='w-full bg-gray-500  bg-gradient-to-b from-gray-500 via-gray-700 to-gray-700 py-26 items-center    mt-2 text-center'>
      <Container>
        <div className='flex flex-wrap  '> 
          <div className='py-20 w-full'>
            <motion.h1 className='text-5xl     bg-clip-text   bg-white/100  font-bold'
            initial={{opacity: 0 , x:40}}
            animate={{opacity:1,x:0}}
            transition={{duration:1, ease: 'easeOut'}}
            >
              
              <span className=' '>login to read posts</span>

            </motion.h1>
          </div>
        </div>

      </Container>
    </div>
  )
}

return (
  <div className=' '>
    <Container>
      <h1 className='text-2xl font-semibold mb-5'>Latest Posts</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 '>
        {latestPosts.map((post)=>(
          <div key={post.$id} className='p-0 md:p-3'>
            <PostCard post={post} />
          </div>

        ))}

      </div>
    </Container>



  </div>

)

}

export default Home
