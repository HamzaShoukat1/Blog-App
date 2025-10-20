import React from 'react'
import { Input, RTE } from '../index'

const PostMainFields = ({ register, errors, control }) => {
  return (
    <div className=' '>
      <Input
        label='Title'
        placeholder='Title'
        className='mb-4 '
        {...register('title', { required: 'Title is required' })}

      />
      {errors.title && (
        <p className='text-red-600 text-sm'>{errors.title.message}</p>
      )}

      <Input
        label='Slug'
        readOnly
        placeholder='Slug'
        className='mb-4'
        {...register('slug', { required: true })}
      />

      <RTE
        label='Content'
        name='content'
        control={control}
        defaultValue=""
      />
    </div>
  )
}

export default PostMainFields
