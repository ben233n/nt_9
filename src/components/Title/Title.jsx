import React from 'react'
import styles from './Title.module.css'
import { DownLookMask, LeftLook,RightLook } from '../Anime';
import { motion } from 'framer-motion'
const Title = ({bigtitle,mar}) => {
  return (
    <>
        <div className={`${styles.container} ${styles[mar]}`}>
            <motion.div className={styles.line} {... LeftLook}></motion.div>
            <motion.div className={styles.text} {... DownLookMask}>{bigtitle}</motion.div>
            <motion.div className={styles.line} {... RightLook}></motion.div>
        </div>

    </>
  )
}

export default Title