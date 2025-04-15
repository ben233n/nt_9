import React from 'react'
import styles from './Firecard.module.css';
import Btn1 from '../Btn1/Btn1';
import { Link, useNavigate } from 'react-router';
import { motion } from "motion/react"
import { LeftLookItem } from '../Anime';

const Firecard = ({shopimg,top,word,link_name}) => {
    const navigate=useNavigate();
    const goto=()=>{
      navigate(link_name);
  }

  return (
    <motion.div  className={styles.card} variants={LeftLookItem}>
      <Link to={link_name} className={styles.div_img}>
        <img src={shopimg} alt="" className={styles.img}/>
      </Link>
      <h3 className={styles.word}>{top}</h3>
      <Link to={link_name} className={styles.word}>{word}</Link>
      <Btn1 btnclass={styles.btn} onClick={goto}/>
    </motion.div>
  )
}
// to={link_name}
export default Firecard