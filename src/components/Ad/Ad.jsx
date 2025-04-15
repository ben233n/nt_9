import React from 'react'
import AdIcon from '../../assets/svg/ad.svg?react';
import styles from './Ad.module.css'
import { Link } from 'react-router';
import { motion } from "motion/react"
import { DownLook, FadeIn } from '../Anime';
export const Ad = () => {
  return (
    <>
    <motion.div className={styles.container} {...DownLook}>
      <Link to="/shop/3">
      <AdIcon className={styles.ad}/>
      </Link>
    </motion.div>
    </>
  )
}
