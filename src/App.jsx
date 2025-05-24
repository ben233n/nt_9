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
import Login from "./pages/Login/Login";
import MyUser from "./pages/MyUser/MyUser";
import { setUser, clearUser } from "./redux/userSlice";

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './api/firebaseConfig';
import { fetchUserTheme } from './api/firestore/userService'; // 你寫好的 fetch function
import { setTheme } from './redux/modelSlice';
import { getFavorites } from './api/firestore/favoriteService'; // 加這行
import { setFavorites } from './redux/favoriteSlice'; // 加這行

function App() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.model.mode);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // 使用者已登入，更新 Redux 狀態
        const userInfo = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        };
        dispatch(setUser(userInfo));
  
        // 🔁 同步 Firestore 中的主題
        const savedTheme = await fetchUserTheme(user.uid);
        dispatch(setTheme(savedTheme));
        // ✅ 同步收藏
        const favorites = await getFavorites(user.uid); // <-- Firestore 撈資料
        dispatch(setFavorites(favorites)); // <-- 存進 Redux
      } else {
        // 使用者未登入，這邊可以選擇清空 user 狀態（可選）
        dispatch(clearUser());
      }

      
    });
  
    return () => unsubscribe(); // 離開時取消監聽
  }, []);
  
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
        <Route path="/Login" element={<Login/>}/>
        <Route path="/myuser" element={<MyUser/>}/>
      </Routes>


      {!user &&
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
      }


      {/*彈跳提示視窗  */}
      <Alert/> 
    </>
  )
}

export default App
