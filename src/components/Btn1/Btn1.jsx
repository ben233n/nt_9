import React from 'react'
import styles from './Btn1.module.css';

const Btn1 = ({btnclass,onClick}) => {

  return (
    <button className={`${styles.btn} ${btnclass}`} onClick={onClick}>前往購買</button>
  )
}

export default Btn1