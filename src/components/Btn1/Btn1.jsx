import React from 'react'
import styles from './Btn1.module.css';
const Btn1 = ({btnclass}) => {
  return (
    <button className={`${styles.btn} ${btnclass}`}>前往購買</button>
  )
}

export default Btn1