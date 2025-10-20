import React, {useState,useEffect} from 'react'
import { Container } from '../Components'
import { useDispatch,useSelector } from 'react-redux'
import PostCard from '../Components/Postcard/PostCard'
import { fetchAllPosts } from '../Store/PostSlice'

function Allposts() {
const dispatch = useDispatch()
const {allPosts} = useSelector(state=> state.posts)
  useEffect(() => {
   dispatch(fetchAllPosts())

   
  }, [dispatch,allPosts])


  
  return (
    <div className=' px-2  '>
      <Container>
      <div className=' w-full   grid  grid-cols-2  sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        
        {allPosts.map((post)=>(
          
          <div key={post.$id} className='p-0 md:p-2 '>
            <PostCard  post={post}/>

          </div>
        ))}
      </div>
      </Container>
      
    </div>
  )
}

export default Allposts
