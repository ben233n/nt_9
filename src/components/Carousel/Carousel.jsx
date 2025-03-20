import React from 'react'
import { useState, useEffect, useRef } from "react";
import styles from './Carousel.module.css'
import { motion } from "motion/react"

const images=[
    {src:'/img/幸運草草草.jpg',id:'1'},{src:'/img/幸運草草.jpg', id:'2'},{src:'/img/幸運草.jpg',id:'3'}
]


const Carousel = () => {
const [selected,setSelected]=useState(0);
const [containerWidth, setContainerWidth] = useState(0); //寬
const controlsRef = useRef(null); //可以找到指定容器
useEffect(() => {
    if (controlsRef.current) {
      setContainerWidth(controlsRef.current.offsetWidth); // 取得 `.controls` 的寬度
    }
    // 監聽視窗大小變化，確保按鈕寬度隨之更新
    const handleResize = () => {
      if (controlsRef.current) {
        setContainerWidth(controlsRef.current.offsetWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
}, []);


  return (
    <div className={styles.carousel} ref={controlsRef}> {/* ref是讓controlsRef 找到這個容器 */}
      
      {/* 圖片區域，使用 motion 添加淡入淡出的動畫 */}
      <div className={styles.image}>
            <motion.img
              key={images[selected].id}
              src={images[selected].src} 
              alt="carousel" 
              className={styles.img} // [自己定義] 套用 CSS 樣式
              //下面是[motion]參數，入場、最終目標、離場
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.8 }} 
            />
      </div>

      
      {/* 按鈕區域 */}
      <div className={styles.controls}> 
        {images.map((img, index) => ( //map第二個參數預設都是index，可以索引序號
          <button
            key={index} 
            className={styles.button} // 單個按鈕樣式
            style={{
                width:`${containerWidth/images.length}px`, //按鈕寬等於父容器除按鈕數量
                backgroundColor: selected===index? '#576E61':'var(--bg-small-color)'
            }}
            onClick={() => setSelected(index)} // [React] 點擊按鈕時，更新 selected 狀態
          />
        ))}
      </div>
    </div>

  )
  
}

export default Carousel