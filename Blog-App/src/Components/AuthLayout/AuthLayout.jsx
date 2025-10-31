import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate()
  const authStatus = useSelector((state) => state.auth.status)

  useEffect(() => {
    if (authStatus === 'idle' || authStatus === 'pending') {
      return
    }

    if (authentication && authStatus !== 'fulfilled') {
      // User is NOT authenticated, but trying to access protected route
      navigate('/login')
    }

    if (!authentication && authStatus === 'fulfilled') {
      // User is authenticated but trying to access guest-only route
      navigate('/')
    }
  }, [authStatus, navigate, authentication])

  return  <>

  {children}

  </>
}
