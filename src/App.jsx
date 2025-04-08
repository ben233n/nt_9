import { useState, useEffect } from "react";
import './App.css'
import Home from './pages/Home/Home'
import { Route, Routes, Link } from 'react-router'
import Shop from './pages/Shop/Shop'
import { useLocation } from "react-router-dom";
import Goods from "./pages/Goods/Goods";
import Cartpage from "./pages/Cartpage/Cartpage";


function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0); // 跳轉到頂部
  }, [location.pathname]); // 監聽 pathname 變化

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/shop' element={<Shop/>}/>
        <Route path="/shop/:id" element={<Goods/>}/>
        <Route path="/cart" element={<Cartpage/>}/>
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
