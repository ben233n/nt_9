import React,{ useRef } from 'react'
import styles from './SubscribeBody.module.css';
import Title from '../Title/Title';
import { motion } from 'motion/react';
import { DownLookDelay, DownLookItem, LeftLook, RightLook } from '../Anime';
const SubscribeBody = ({svg: SvgComponent,mode,text,into,title,siblingRef }) => {
    const scrollToTarget = () => {
        siblingRef.current.scrollIntoView({ behavior: "smooth" });
    };
    switch (mode) {
        case 'left':
            return (
                <>
                    <div className={styles.bg}>
                        <motion.div className={`${styles.container} container `} {...LeftLook}>
                            <div className={styles.img_box}>
                                <SvgComponent className={styles.svg}/>
                            </div>
                            <motion.div className={styles.text_box} {...DownLookDelay}>
                                <motion.div variants={DownLookItem} className={styles.title}>
                                    <div className={styles.line} ></div>
                                    <div className={styles.h2} >{title}</div>
                                    <div className={styles.line} ></div>
                                </motion.div>
                                <motion.h3 variants={DownLookItem} className={styles.h3} dangerouslySetInnerHTML={{ __html: text }}/>
                                <motion.div variants={DownLookItem}>
                                    <button  className={styles.btn} onClick={scrollToTarget}>比較方案</button>
                                </motion.div>

                                <motion.p variants={DownLookItem} className={styles.p}>※內容物：{into}</motion.p>
                            </motion.div>
                        </motion.div>
                    </div>
                </>
            )
        case 'right':
            return (
                <>
                    <div className={styles.bg_right} >
                        <motion.div className={`${styles.container_right} container `} {...RightLook}>
                            <div className={styles.img_box}>
                                <SvgComponent className={styles.svg}/>
                            </div>
                            <motion.div className={styles.text_box} {...DownLookDelay}>
                                <motion.div variants={DownLookItem} className={styles.title}>
                                    <div className={styles.line} style={{backgroundColor:"var(--text-block-color)"}}></div>
                                    <div className={styles.h2} style={{color:"var(--text-block-color)"}}>{title}</div>
                                    <div className={styles.line} style={{backgroundColor:"var(--text-block-color)"}}></div>
                                </motion.div>
                                <motion.h3 variants={DownLookItem} className={styles.h3} style={{color:"var(--text-block-color)"}} dangerouslySetInnerHTML={{ __html: text }}/>
                                <motion.div variants={DownLookItem}>
                                    <button className={styles.btn_right} onClick={scrollToTarget}>比較方案</button>
                                </motion.div>

                                <motion.p variants={DownLookItem} className={styles.p} style={{color:"var(--text-block-color)"}}>※內容物：{into}</motion.p>
                            </motion.div>
                        </motion.div>
                    </div>
                </>
            )
    
        default:
            return null;
    }
}

export default SubscribeBody