import React, { useEffect } from 'react'
import './app.css'
import HomePage from './pages/HomePage'
import SettingsPage from './pages/SettingsPage'
import LoginPage from './pages/LoginPage'
import SignUp from './pages/SignUp'
import ProfilePage from './pages/ProfilePage'
import Navbar from './components/Navbar'
import {Toaster} from "react-hot-toast"
import {Routes,Route, Navigate} from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore'

import {Loader} from 'lucide-react'

const App = () => {
  const {authUser,checkAuth,isCheckingAuth,onlineUsers} = useAuthStore()
  // console.log(onlineUsers)
  useEffect(()=>{
    checkAuth()
  },[checkAuth]);

  console.log({authUser})

  if(isCheckingAuth) return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className='size-10 animate-spin'/>
    </div>
  )

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={authUser ?<HomePage/>: <Navigate to="/login"/> } />
        <Route path="/signup" element={!authUser?<SignUp/>:<Navigate to="/"/>} />
        <Route path="/login" element={!authUser?<LoginPage/>:<Navigate to="/"/>} />
        <Route path="/settings" element={<SettingsPage/> }/>
        <Route path="/profile" element={authUser ?<ProfilePage/>: <Navigate to="/login"/>} />
      </Routes>

    <Toaster/>

    </div>

  )
}

export default App