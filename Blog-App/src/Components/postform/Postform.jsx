import React,{useCallback,useState} from 'react'
import { useForm } from 'react-hook-form'
import {Button,Input, Select,RTE} from '../index'
import appwriteService from '../../Appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PostMainFields from './Postmainfields'
import PostSidebarFields from './PostSidebarfield'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { fetchAllPosts } from '../../Store/PostSlice'
function Postform({post}) {
   const navigate = useNavigate()
   const dispatch = useDispatch()
  const userData = useSelector(state=> state.auth.userData) 
    const [submitError, setsubmitError] = useState('')

  
  const { register,handleSubmit,watch,setValue,control,getValues, formState:{errors,isSubmitting}} = useForm({
    defaultValues:{
      title: post?.title || '',
      slug: post?.slug || '', 
      content: post?.content || '',
      status: post?.status || 'active',
    }
  })
 


  const submit = async (data)=>{
    setsubmitError('')
    if (post){
      const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null
      if(file){
        appwriteService.deleteFile(post.featuredimage)
      }

      const updPost = await appwriteService.updatePost(post.$id,{
        ...data,
        featuredimage: file ? file.$id : undefined,
      
      })
        toast.success('Post updated successfully!')
      
        if(updPost){

          navigate(`/post/${updPost.$id}`)

        }

      



    }
    else{
      //toast up for exting title
      const existingPost =  await appwriteService.getPostByTitle(data.title.trim())
      {
        if(existingPost && existingPost.documents.length > 0){
  toast.error("A post with this title already exists.");
           return  //stop funciton
        }
      }
     
      const file =  await appwriteService.uploadFile(data.image[0])
      if(file){
        const  fileId =  file.$id
        data.featuredimage = fileId
       const dbpost  =  await appwriteService.createPost({
          ...data,
          userid: userData.$id
        })
        
        toast.success('Post created successfully!')
        
        if(dbpost){
          console.log("Created post:", dbpost); 
          // dispatch(fetchAllPosts())
          navigate(`/post/${dbpost.$id}`)
        }
        setsubmitError(errors.message)
      }
        
    }

  }
  



  const slugTransform = useCallback((value)=>{
    if(value && typeof  value === 'string')
       return value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')      // Remove all non-alphanumeric, non-space, non-hyphen chars
      .replace(/\s+/g, '-')              // Replace spaces (or multiple spaces) with a single hyphen
      .replace(/-+/g, '-')               // Remove duplicate hyphens
      .replace(/^-+|-+$/g, '')  

      return ''

  },[])

  React.useEffect(()=>{
    const subscription = watch((value,{name})=>{

      if(name === 'title'){
        setValue('slug', slugTransform(value.title,
          {shouldValidate:true}
        ))
      }
    })
    return ()=>{
      subscription.unsubscribe()
    }
  },[watch,slugTransform,setValue])

 
  











  return (
   <form onSubmit={handleSubmit(submit)} className=' flex flex-wrap '>
   <div className='w-full md:w-2/3'>
     <PostMainFields 
    register={register}
    errors={errors}
    control={control}
    // getValues={getValues}
    // setValue={setValue}
    />

   </div>
    {/* //2nd div */}
   <div className='w-full md:w-1/3'>
    <PostSidebarFields 
   register={register}
   errors={errors}
   post={post}
   isSubmitting={isSubmitting}
    />
   </div>
   </form>
  )
}

export default Postform
