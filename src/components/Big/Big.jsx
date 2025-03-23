import React from 'react'
import styles from './Big.module.css'
import { Link } from 'react-router'
const Big = () => {
  return (
    <div className={styles.big_img}>
      <div className={`container ${styles.container} `}>
          <h2 className={styles.la_h2}>自然資源商店</h2>
          <h2 className={styles.la_p}>嚴選｜無添加｜純天然 | 大地恩賜｜最真實的美</h2>
          <Link to="/shop/"><button className={styles.btn}>前往商店</button></Link>
      </div>
    </div>
  )
}

export default Big