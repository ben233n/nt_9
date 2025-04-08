import { useState, useEffect } from "react";
import './App.css'
import Home from './pages/Home/Home'
import { Route, Routes, Link } from 'react-router'
import Shop from './pages/Shop/Shop'
import { useLocation } from "react-router-dom";
import Goods from "./pages/Goods/Goods";
import Cartpage from "./pages/Cartpage/Cartpage";
import { motion } from 'framer-motion';
import Sun from './assets/svg/sun.svg?react';
import Moon from './assets/svg/moon.svg?react';
import Head from "./components/Head/Head";

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
     <Head/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/shop' element={<Shop/>}/>
        <Route path="/shop/:id" element={<Goods/>}/>
        <Route path="/cart" element={<Cartpage/>}/>
      </Routes>


      <motion.div 
       className="dark_light"
       animate={{rotateY:theme === "light" ? 0 :180}}
       transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        {
          theme === "light" ?<Sun className='sun'/>:<Moon className='sun'/>
        }

      </motion.div>
    </>
  )
}

export default App
