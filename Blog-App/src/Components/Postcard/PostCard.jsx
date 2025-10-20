import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getFileView } from '../../Store/PostSlice'

function PostCard({post}) {
  const dispatch = useDispatch()
  const {fileview} = useSelector(state=>state.posts)
  const imageUrl = fileview[post.featuredimage]
  const localimg = '/images.jpg'
  useEffect(() => {
  
  if(post?.featuredimage){
    dispatch(getFileView(post.featuredimage))
  }
  }, [dispatch,post?.featuredimage,imageUrl])
  

  if(!post) return null
  const {$id, title} = post
  
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full  bg-gray-400 hover:bg-gray-300  transition ease-in-out duration-400 rounded-md p-1 '>
        <div className='w-full justify-center mb-4'>
          <img 
          className='rounded-md w-70 h-35 '
          src={imageUrl || localimg}
          onError={(e)=>{e.currentTarget.src = localimg}}

           />

        </div>
        <h2 className='text-base  font-bold '>{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard
