import React from 'react'
import Navbar from './components/navbar/Navbar'
import Home from './components/Home'
import Login from './components/auth/Login'
import TimeSheet from './components/TimeSheet'
import { Route, Routes } from 'react-router-dom'
export default function App() {
  return (
    <>
    
 
    <Navbar />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path="/timesheet" element={<TimeSheet />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>

      
    </>
  )
}

