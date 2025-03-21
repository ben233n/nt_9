import React from 'react'
import styles from './Firecard.module.css';
import Btn1 from '../Btn1/Btn1';
const Firecard = ({shopimg,top,word}) => {
  return (
    <div className={styles.card}>
      <div className={styles.div_img}>
        <img src={shopimg} alt="" className={styles.img}/>
      </div>
      <h3 className={styles.word}>{top}</h3>
      <h3 className={styles.word}>{word}</h3>
      <Btn1 btnclass={styles.btn}/>
    </div>
  )
}

export default Firecard