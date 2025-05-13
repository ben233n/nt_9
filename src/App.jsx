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
import Blog from "./pages/Blog/Blog";
import Alert from "./components/Alert/Alert";
import { useDispatch, useSelector } from 'react-redux';
import { bangModel } from './redux/modelSlice';
import TitleManager from "./components/TitleManager";
import Blogpage from "./pages/Blogpage/Blogpage";
import Subscribe from "./pages/Subscribe/Subscribe";

function App() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.model.mode);

  
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0); // 跳轉到頂部
  }, [location.pathname]); // 監聽 pathname 變化

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  return (
    <>
     <Head/>
     <TitleManager/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/shop' element={<Shop/>}/>
        <Route path="/shop/:id" element={<Goods/>}/>
        <Route path="/cart" element={<Cartpage/>}/>
        <Route path="/blog" element={<Blog/>}/>
        <Route path="/blog/:id" element={<Blogpage/>}/>
        <Route path="/subscribe" element={<Subscribe/>}/>

      </Routes>



      <motion.div 
       className="dark_light"
       animate={{rotateY:mode === "light" ? 0 :180}}
       transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      onClick={() => dispatch(bangModel())}>
        {
          mode === "light" ?<Sun className='sun'/>:<Moon className='sun'/>
        }

      </motion.div>

      {/*彈跳提示視窗  */}
      <Alert/> 
    </>
  )
}

export default App
