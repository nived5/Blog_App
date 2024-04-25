import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import ProfilePage from '../pages/ProfilePage'
import PostDetailsPage from '../pages/PostDetailsPage'
import LoginPage from '../pages/LoginPage'
import SignUpPage from '../pages/SignUpPage'

function Router() {
  return (
    <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='profile' element={<ProfilePage/>}/>
        <Route path='post/:id' element={<PostDetailsPage/>}/>
        <Route path='login' element={<LoginPage/>}/>
        <Route path='signup' element={<SignUpPage/>}/>
    </Routes>
  )
}

export default Router