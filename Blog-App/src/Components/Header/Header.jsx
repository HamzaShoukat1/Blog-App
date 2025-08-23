import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state)=> state.auth.status)
  const isLogedin = authStatus === 'fulfilled'
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: "Login",
      slug:'/login',
      active: !isLogedin
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !isLogedin
    },
    {
      name: "All Posts",
      slug: '/all-posts',
      active: isLogedin
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: isLogedin
    }
  ]
  return (
   <header className='px-3 shadow bg-gray-500'>
    <Container>


      <nav className='flex'> 
        <div className='mr-4'>
          <Link to='/'>
          <Logo width='70px' />
          </Link>
        </div>

        <ul className='flex ml-auto'> 
          {/* //jo chheze repeat hotii he on pr keys lagate he */}

          {navItems.map((item)=>
          item.active ? (
            <li key={item.name}>
              <button
              onClick={()=> navigate(item.slug)}
              className=' px-6 text-base font-semibold py-3 cursor-pointer'
              >{item.name}</button>
            </li>

          ) : null
          )}
        




          {isLogedin && ( 
            <li>
              <LogoutBtn />
            </li>
          )}
          
        </ul>


      </nav>


    </Container>

   </header>
  )
}

export default Header
