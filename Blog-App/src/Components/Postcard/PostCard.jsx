import React from 'react'
import appwriteService from '../../Appwrite/config'
import { Link } from 'react-router-dom'



function PostCard({post}) {
  const localimg = '/images.jpg'

  if(!post) return null
  const {$id, title, featuredimage} = post
  
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full  bg-gray-400 hover:bg-gray-500 transition ease-in-out duration-400 rounded-md p-1 '>
        <div className='w-full justify-center mb-4'>
          <img 
          className='rounded-md'
          src={ featuredimage ? appwriteService.getFileView(featuredimage) : localimg } 
          onError={(e)=>{e.currentTarget.src = localimg}}

           />

        </div>
        <h2 className='text-base font-bold '>{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard
