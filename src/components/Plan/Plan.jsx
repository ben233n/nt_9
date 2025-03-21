import React from 'react'
import styles from './Plan.module.css'
import { motion } from "motion/react"
const Plan = () => {
  return (
    <div className={styles.bg}>
        <div className={styles.container}>
            <div className={styles.line}></div>
            <div className={styles.text}>訂閱方案</div>
            <div className={styles.line}></div>
            
        </div>
        <div className={`container ${styles.down}`}>
            <div className={styles.word}>
                <h2 className={styles.h2}>提供三種方案</h2>
                <h3 className={styles.h3}>✅ 採用月訂閱制</h3>
                <h3 className={styles.h3}>✅ 每個月定時贈送自然小物與精美自然風景照</h3>
                <h3 className={styles.h3}>✅ 有機會可以抽到紐西蘭米佛峽灣的機票</h3>
                <button className={styles.btn}>查看更多方案</button>
            </div>
            <motion.div
              className={styles.div_img}
              animate={{
                y: [0, -20, 0] // 上下移動
              }}
              transition={{
                duration: 3, // 動畫時間
                repeat: Infinity, // 無限循環
                repeatType: "mirror", // 來回動畫
                ease: "easeInOut" // 緩動效果
              }}
            >
                <img src="/img/飛翔的山.png" alt="" className={styles.img}/>
            </motion.div>

        </div>
    </div>

  )
}

export default Plan