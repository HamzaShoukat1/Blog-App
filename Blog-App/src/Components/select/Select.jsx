import React,{useId} from 'react'

//dropdown component
const Select = React.forwardRef(function Select({
  options,
  label,
  className='',
  ...props
},ref) {
  const id = useId()
  return (
    <div className='w-full'>
      {label && 
      <label
      htmlFor={id}
       className='block text-sm font-medium text-gray-700 mb-1'> 
       {label}
        </label>}
        <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none border border-gray-200  ${className}`}
        >
          {options?.map((option,index)=>(
            <option key={index} value={option}>
              {option}
            </option>


          ))}

        </select>
    </div>
  )
})

export default Select
