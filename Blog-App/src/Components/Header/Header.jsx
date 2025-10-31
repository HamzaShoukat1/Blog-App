import React, { useState } from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RxCross2 } from "react-icons/rx";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink } from 'react-router-dom'


function Header() {
  const [menuOpen, setmenuOpen] = useState(false)
  const closeMenu = ()=> setmenuOpen(false)
  const toggleMenu = ()=> setmenuOpen((prev)=> !prev)
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


      <nav className='hidden md:flex'> 
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
      <div className='md:hidden flex justify-end cursor-pointer ' onClick={toggleMenu}>
<RxHamburgerMenu   />

      </div>

      {/* //menu  */}

      <div
        className={` bg-gradient-to-r from-gray-400  to-gray-800 fixed top-0 right-30 h-full w-full  text-white z-50 transform  duration-600 
          ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b  border-gray-700">
          <h2 className="text-base  text-center ml-30 font-bold ">Menu</h2>
          <button onClick={closeMenu} aria-label="  close meny" className='cursor-pointer'>
            <RxCross2 className="w-6 h-6 text-white" />
          </button>
        </div>

        <ul className="flex items-start flex-col ml-33 space-y-5 justify-center  text-2xl   ">
         {navItems.map((item)=>
          item.active ? (
            <li key={item.name}>
              <button
              onClick={()=> {
                navigate(item.slug)
                closeMenu()
              }}
              className=' text-base font-semibold py-3 cursor-pointer'
              >{item.name}</button>
            </li>

          ) : null
          )}
          <div className=''> 
              {isLogedin && ( 
            <li>
              <LogoutBtn />
            </li>
          )}
          </div>
        
        </ul>
      </div>


    </Container>

   </header>
  )
}

export default Header
