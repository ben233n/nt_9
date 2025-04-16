import React from 'react'
import { motion } from 'motion/react'
import styles from './BlogBody.module.css'
import Title from '../Title/Title'
import BlogBodyCard from '../BlogBodyCard/BlogBodyCard'
import { DownLook } from '../Anime'

const BlogBody = () => {
  return (
    <>
        <div className={styles.bg}>
            <div className={`${styles.container} container `}>
                <Title bigtitle="部落格" />
                <motion.div className={styles.blog} {...DownLook}>
                  <BlogBodyCard name={"嵐山不只有竹林，竟然還有它..."} content={"這是一篇講述小編在嵐山偶遇一顆石頭，隨後踏上一場橫跨海域、前所未有的遷岩旅程"} img={"https://res.cloudinary.com/daimwhvru/image/upload/f_webp,q_auto/v1744815116/arashiyama-2632036_1280_oybo68.jpg"}/>
                  <BlogBodyCard name={"亞馬遜雨林迷路記"} content={"這是一篇講述小編在亞馬遜雨林中迷路，透過吃雜草維生，後來被盜伐樹木的伐木工獲救的故事"} img={"https://res.cloudinary.com/daimwhvru/image/upload/f_webp,q_auto/v1744816897/forest-438432_1280_j9kzym.jpg"}/>
                  <BlogBodyCard name={"騎著羊駝唱著歌，突然被鐵盒絆倒"} content={"在巴塔哥尼亞草原上體驗騎羊駝的快感，看著那如詩如畫的美景，心情都被療癒了。但突然被一盒鐵盒給絆倒，心情整個不美麗了"} img={"https://res.cloudinary.com/daimwhvru/image/upload/f_webp,q_auto/v1744817290/rn40-4888657_1280_aubcrl.jpg"} />
                </motion.div>
            </div>
        </div>
    </>
  )
}

export default BlogBody