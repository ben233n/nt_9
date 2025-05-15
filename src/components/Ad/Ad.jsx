import React from 'react'
import AdIcon from '../../assets/svg/ad.svg?react';
import styles from './Ad.module.css'
import { Link, useNavigate } from 'react-router';
import { motion } from "motion/react"
import { DownLook, FadeIn } from '../Anime';
export const Ad = () => {
  const adgo=useNavigate();
  const goto=()=>{
    adgo("/shop/3")
  }
  return (
    <>
    <motion.div className={styles.container} {...DownLook}>
      <AdIcon className={styles.ad} onClick={goto}/>
    </motion.div>
    </>
  )
}
