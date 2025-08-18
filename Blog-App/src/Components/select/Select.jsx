import React,{useId} from 'react'

//dropdown component
function Select({
  options,
  label,
  className='',
  inputRef,
  ...props
}) {
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
        ref={inputRef}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none border border-gray-200 w-full ${className}`}
        >
          {options?.map((option,index)=>(
            <option key={index} value={option}>
              {option}
            </option>


          ))}

        </select>
    </div>
  )
}

export default Select
