import React from 'react'
import AdIcon from '../../assets/svg/ad.svg?react';
import styles from './Ad.module.css'
export const Ad = () => {
  return (
    <>
    <div className={styles.container}>
      <AdIcon className={styles.ad}/>
    </div>
    </>
  )
}
