import React from 'react'
import styles from './Big.module.css'
import { Link } from 'react-router'
import { LeftLookDelay, LeftLookItem } from '../Anime'
import { motion } from 'motion/react'

const Big = () => {
  return (
    <div className={styles.big_img}>
      <div className={styles.fogLayer}>
        <div className={`${styles.fog} ${styles.fog1}`}></div>
        <div className={`${styles.fog} ${styles.fog2}`}></div>
        <div className={`${styles.fog} ${styles.fog3}`}></div>
      </div>

      <motion.div className={`container ${styles.container}`} {...LeftLookDelay}>
        <motion.h2 className={styles.la_h2} variants={LeftLookItem}>自然資源商店</motion.h2>
        <motion.h2 className={styles.la_p} variants={LeftLookItem}>嚴選｜無添加｜純天然 | 大地恩賜｜最真實的美</motion.h2>
        <motion.div variants={LeftLookItem}>
          <Link to="/shop/"><button className={styles.btn}>前往商店</button></Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Big