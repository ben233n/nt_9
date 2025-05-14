import React from 'react'
import styles from './Plan.module.css'
import { motion } from "motion/react"
import { DownLookMask, LeftLook, LeftLookDelay, RightLook, LeftLookItem } from '../Anime'
import { useNavigate } from 'react-router'
import Ok from '../../assets/svg/ok.svg?react'
const Plan = () => {
  const goblog=useNavigate();
  const goto=()=>{
    goblog("/subscribe");
  }

  return (
    <div className={styles.bg}>
      {/* 將原本偽元素轉為實體元素 */}
      <motion.div 
        className={styles.bgBefore}
        initial={{ "--blur": "0px" }}
        whileInView={{ "--blur": "10px" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />

      <div className={styles.container}>
        <motion.div className={styles.line} {...LeftLook}></motion.div>
        <motion.div className={styles.text} {...DownLookMask}>
          訂閱方案
        </motion.div>
        <motion.div className={styles.line} {...RightLook}></motion.div>
      </div>
      <div className={`container ${styles.down}`}>
        <motion.div className={styles.word} {...LeftLook}>
          <motion.div {...LeftLookDelay}>
            <motion.h2 className={styles.h2} variants={LeftLookItem}>
              提供三種方案
            </motion.h2>
            <motion.h3 className={styles.h3} variants={LeftLookItem}>
              <Ok/> 採用月訂閱制
            </motion.h3>
            <motion.h3 className={styles.h3} variants={LeftLookItem}>
              <Ok/> 贈品分為本土、區域、全球三種等級
            </motion.h3>
            <motion.h3 className={styles.h3} variants={LeftLookItem}>
              <Ok/> 每個月贈送自然小物與風景照等好康的禮物！
            </motion.h3>
            <button className={styles.btn} onClick={goto}>查看更多方案</button>
          </motion.div>
        </motion.div>
        <motion.div
          className={styles.div_img}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: [-20, 10, -20] }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            opacity: { duration: 1.2, ease: "easeOut" },
            y: {
              duration: 3,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }
          }}
        >
          <img src="/img/飛翔的山.png" alt="" className={styles.img} />
        </motion.div>
      </div>
    </div>
  )
}

export default Plan