import React, { useEffect } from 'react'
import appwriteService from '../../Appwrite/config'
import { Link } from 'react-router-dom'
import { useState } from 'react'


function PostCard({post}) {
  const [preview, setPreview] = useState(null)
  const localimg = '/images.jpg'
  useEffect(() => {
  const loadPreview = async ()=>{
    if(post?.featuredimage){
      try {
        const Preview = await appwriteService.getFileView(post.featuredimage)
        setPreview(Preview)
        
      } catch (error) {
        console.error("err"),error
        
      }
    }
  }
  loadPreview()
  }, [post])
  

  if(!post) return null
  const {$id, title} = post
  
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full  bg-gray-400 hover:bg-gray-300  transition ease-in-out duration-400 rounded-md p-1 '>
        <div className='w-full justify-center mb-4'>
          <img 
          className='rounded-md w-70 h-40  '
          src={preview}
          // onError={(e)=>{e.currentTarget.src = localimg}}
          // onError={(e)=> {e.currentTarget.src = localimg}}

           />

        </div>
        <h2 className='text-base  font-bold '>{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard
