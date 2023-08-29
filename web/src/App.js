import React from 'react';
import Login from './Components/Login'
import './Components/Login.css'
import Dashboard from './Pages/Dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import {Routes,Route} from 'react-router-dom'
// import HomePage from './Pages/HomePage'
const App = () => {
  
  return (
   
    <div className='login-container'>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
      </BrowserRouter>
      </div>
   
    
  )
}

export default App;
