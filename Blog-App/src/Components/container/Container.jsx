import React from 'react'

function Container({children}) {
  return (
    <div className='w-full  overflow-y-hidden max-w-6xl mx-auto px-4 py-3 '>
      {children}
      
    </div>
  )
}
export default Container
