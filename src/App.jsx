import { useState } from 'react'
import './App.css'
import Home from './pages/Home/Home'
import { Route, Routes, Link } from 'react-router'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </>
  )
}

export default App
