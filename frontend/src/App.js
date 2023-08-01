import React from 'react'
import { Route, Routes, Rouute, useNavigate } from 'react-router-dom'
import Home from './container/home';
import { Login } from './components';
const App = () => {
  return (
    <Routes>
      <Route path='Login' element={<Login/>}/>
      <Route path='/' element={<Home/>}/>
    </Routes>
    )
}

export default App

