import { useState, useEffect } from "react";
import './App.css'
import Home from './pages/Home/Home'
import { Route, Routes, Link } from 'react-router'
import Shop from './pages/Shop/Shop'


function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/shop' element={<Shop/>}/>
      </Routes>
      <div className='aaa'>
            <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                {theme === "light" ? "暗色" : "亮色"} 
            </button>
      </div>
    </>
  )
}

export default App
