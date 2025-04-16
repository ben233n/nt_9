import React from 'react'
import { motion } from 'motion/react'
import styles from './BlogBodyCard.module.css'

const BlogBodyCard = ({img,name,content}) => {
  return (
    <>
        <div className={styles.bg}>
            {/* 上 圖片 */}
            <div className={styles.up}>
                <img src={img} alt=""  className={styles.img} loading="lazy"/>
            </div>
            {/* 下 文字*/}
            <div className={styles.down}>
                <h3 className={styles.name}>{name}</h3>
                <p className={styles.p}>{content}</p>
            </div>
        </div>
    </>
  )
}

export default BlogBodyCard