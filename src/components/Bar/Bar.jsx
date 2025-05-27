import React from 'react'
import styles from './Bar.module.css'
import { motion } from 'framer-motion'
import Cart from '../../assets/svg/shop.svg?react'
import Pen from '../../assets/svg/pen.svg?react'
import Receipt from '../../assets/svg/receipt.svg?react'

// const steps = [
//   { title: '購物車' },
//   { title: '填寫資料' },
//   { title: '訂單確認' },
// ]

const Bar = ({ step }) => {

    return (
      <div className={styles.bg}>
        <div  className={styles.one_step}>
          <div className={styles.icon_box}>
            <Cart className={`${styles.icon} ${step>=1?styles.yes_light:styles.no_light}`}/>
            <p className={`${styles.p} ${step>=1?styles.yes_light:styles.no_light}`}>購物車</p>
          </div>
        </div>
        <div  className={styles.one_step}>
          <div className={`${styles.line} ${step >= 2 ? styles.yes_light_line : styles.no_light_line}`} />
          <div className={styles.icon_box}>
            <Pen className={`${styles.icon} ${step>=2?styles.yes_light:styles.no_light}`}/>
            <p className={`${styles.p} ${step>=2?styles.yes_light:styles.no_light}`}>填寫資料</p>
          </div> 
        </div>
        <div  className={styles.one_step}>
          <div className={`${styles.line} ${step >= 3 ? styles.yes_light_line : styles.no_light_line}`} />
          <div className={styles.icon_box}>
            <Receipt className={`${styles.icon} ${step>=3?styles.yes_light:styles.no_light}`}/>
            <p className={`${styles.p} ${step>=3?styles.yes_light:styles.no_light}`}>訂單確認</p>
          </div> 
        </div>
       
      </div>
    )
}

export default Bar