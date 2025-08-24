import React from 'react'
import {  Select, Button } from '../index'
const PostSidebarFields = ({ register, errors ,post,isSubmitting }) => {
  return (
    
    <div className=' px-2 '>
      <h1 className='mb-1'>Featured Image </h1>
 
  <input

  label="featured-image"
    id="image"
    type="file"
    accept="image/png,image/jpg,image/jpeg,image/gif"
    className="mb-4 block w-full text-sm text-gray-800
             file:mr-4 file:py-1 mt-2 cursor-pointer file:px-4
             file:rounded file:border-0
             file:bg-gray-200 file:cursor-pointer file:text-gray-800
             "
    {...register('image', {
      required: !post ? 'Image is required' : false,
    })}
  />
      {errors.image && (
        <p className='text-red-600 text-sm mb-2'>{errors.image.message}</p>
      )}

     <h1 className='mt-6'>status</h1>
    <label 
    htmlFor="status">
    </label>
      <Select
id='status'

        options={['active', 'inactive']}
        className='mb-4 mt-2 p-2 w-full cursor-pointer'
        {...register('status', { required: true })}
      />

      <Button

        type='submit'
        disabled={isSubmitting}
        bgColor={post ? 'bg-green-500' : 'bg-blue-400'}
        className='w-full   cursor-pointer'
      >

        {isSubmitting ? 'waiting...' : post ? 'Update' : 'Submit'}
      </Button>

    </div>
  )
}

export default PostSidebarFields
