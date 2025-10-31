import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './Store/store.js'
import Home from './Pages/Home.jsx'
import { AuthLayout,Login } from './Components/index.js'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Addpost from './Pages/Addpost.jsx'
import EditPost from './Pages/EditPost.jsx'
import Allposts from './Pages/Allposts.jsx'
import Post from './Pages/Post.jsx'
import Signup from './Pages/Signup.jsx'
import { Loaderwrapper } from './Loader/Loaderwrapper.jsx'
import ErrorPage from './Pages/Errorpage.jsx'
import React from 'react'
import AuthDesign from './Pages/AuthDesign.jsx'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route  path = '/' element={<App />}
    errorElement={<ErrorPage />}
    >
      <Route index element={<Home />} />
      
     <Route element={<AuthDesign />}>
       <Route path='/login' element={(
        <AuthLayout authentication={false}>
          <Login />
        </AuthLayout> 
      )} />
      <Route path='/signup' element={(
        <AuthLayout authentication={false}>
          <Signup />
        </AuthLayout>
      )} />
     </Route>



      <Route path='/all-posts' element={(
        <AuthLayout authentication={true}>
          <Allposts />
        </AuthLayout>
      )} />
      <Route path='/add-post' element={(
        <AuthLayout authentication={true}> 
          <Addpost />
        </AuthLayout>

      )} />
      <Route path='/edit-post/:slug' element={(
        <AuthLayout authentication={true}>
          <EditPost />
        </AuthLayout>
      )}/>
      <Route path='/post/:slug' element={
        <AuthLayout authentication={true}>
          <Post />
         </AuthLayout>
      } />
    </Route>
  )
  
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
   <Loaderwrapper>
     <RouterProvider router={router} />
   </Loaderwrapper>
  </Provider>
  </StrictMode>,
)
