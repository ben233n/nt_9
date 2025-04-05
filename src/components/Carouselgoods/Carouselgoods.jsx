import React from 'react'
import { useState} from "react";
import styles from './Carouselgoods.module.css'
import { motion } from "motion/react"



const Carouselgoods = ({photos}) => {
  const [selected,setSelected]=useState(0);

  return (
    <div className={styles.carousel} >
      {/* 按鈕區域 */}
      <div className={styles.controls}> 
        {photos.map((img, index) => ( //map第二個參數預設都是index，可以索引序號
          <div key={index} 
          className={styles.button} 
          onClick={() => setSelected(index)} 
          style={{opacity:selected === index? 1:0.5}}
          > 
            <img src={photos[index]} alt="" className={styles.img_three}/>
          </div>
          
        ))}
      </div>
      
      {/* 圖片區域，使用 motion 添加淡入淡出的動畫 */}
      <div className={styles.image}>
            <motion.img
              key={photos[selected]}
              src={photos[selected]} 
              alt="carousel" 
              className={styles.img} // [自己定義] 套用 CSS 樣式
              //下面是[motion]參數，入場、最終目標、離場
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.8 }} 
            />
      </div>
      
      
      
    </div>

  )
}

export default Carouselgoods