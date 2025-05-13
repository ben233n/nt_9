import React from 'react'
import { motion } from 'motion/react'
import styles from './CompareCard.module.css'
import { Link } from 'react-router'
import { div } from 'motion/react-client'
import Ok from '../../assets/svg/ok.svg?react'
const CompareCard = ({planname,money,planp}) => {
    return (
        <>
            <div className={styles.bg}>
                <div className={styles.up}>
                    <h3 className={styles.h3}>- {planname} -</h3>
                    <div className={styles.money}>
                        <h2 className={styles.h2}>${money}</h2>
                        <h4 className={styles.h4}>/每月</h4>
                    </div>
                    <button className={styles.buy}>訂閱方案</button>
                </div>
                <div className={styles.down}>
                    {
                        planp.map((one)=>(
                            <>
                                <div className={styles.p_box}>
                                    <Ok className={styles.ok}/>
                                    <p className={styles.p}>{one}</p>
                                </div>
                            </>
                            
                        ))
                    }
                </div>
            </div>
        </>
      )
}

export default CompareCard