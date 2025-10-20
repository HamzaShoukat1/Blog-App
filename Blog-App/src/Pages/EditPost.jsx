import React, {useEffect,useState} from 'react'
import { Container, Postform } from '../Components'
import appwriteService from '../Appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPostbyId } from '../Store/PostSlice'
import { toast } from 'react-hot-toast'

function EditPost() {
  const dispatch = useDispatch()
  const {slug} = useParams()
  const navigate = useNavigate()
  const {currentPost,status} = useSelector(state=>state.posts)


  useEffect(() => {
   dispatch(getPostbyId(slug))
  }, [slug,dispatch])
  

  if (status === 'loading' || !currentPost) return <p className='p-4'>...</p>

  
  return currentPost ? (
    <div className='py-8'>
      <Container>
        <Postform post={currentPost} />
      </Container>
    </div>

  ): null
}

export default EditPost
