import React, {useId} from 'react'

const Input = React.forwardRef(function Input({
  label,
  type = 'text',
  className = '',
  ...props

},ref){

  const id = useId() //useId is used to generate a unique ID every time the component is rendered. This is important for accessibility, especially when connecting a <label> to its corresponding <input>.
  return (
    <div className='w-full'>
      {label && <label
       className='inline-block mb-1 pl-1' 
       htmlFor={id}>
        {label}
        </label>
        }
        
        <input
        type={type}
        className={`px-4 py-2 w-full  focus:border-gray-400 rounded-lg bg-white text-black outline-none border border-gray-200 ${className}`} 
        ref={ref}
        {...props}
        id={id}
        />
    </div>
  )
  

})

export default Input
