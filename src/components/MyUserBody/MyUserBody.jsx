import React, { useState } from 'react'
import styles from './MyUserBody.module.css'
import Out from '../Out/Out'
import Older from '../../assets/svg/oldersvg.svg?react'
import Love from '../../assets/svg/loveno.svg?react'
import UserEdit from '../../assets/svg/useredit.svg?react'
import Brush from '../../assets/svg/brush.svg?react'
import { color } from 'motion/react'
import Theme from '../Theme/Theme'
import MyData from '../MyData/MyData'
import { motion } from "motion/react"
import { FadeInOne } from '../Anime'
import MyLove from '../MyLove/MyLove'


const MyUserBody = () => {
    const [whoLight,setWhoLight]=useState(3);

    const renderContent = () => {
        switch (whoLight) {
          case 0:
            return <MyData/>
          case 1:
            return <div>訂單查詢內容</div>
          case 2:
            return <MyLove/>
          case 3:
            return <Theme/>
          default:
            return null
        }
      }


  return (
    <>
        <div className={styles.bg}>
             <div className={`${styles.container} container `}>
                 <motion.div className={styles.left} {...FadeInOne}>
                  <div className={styles.up_box} >
                      {/* 照片容器 */}
                      <div className={styles.head_div}>
                        <img src="/img/馬達加斯加土1.jpg" alt="/img/嵐山石.png" className={styles.head}/>
                      </div>
                      {/* 名字 和登出*/}
                      <div className={styles.name_and_out}>
                        <h3 className={styles.name}>吳小安</h3>
                        <Out className={styles.out}/>
                      </div>
                    </div>
                    
                    {/* 服務 */}
                    <div className={styles.serve}>
                        <p className={styles.project} onClick={()=>(setWhoLight(0))}
                            style={{color:whoLight===0?'var(--text-ttitle-color)':'var(--text-header-color)'}}> <UserEdit/>基本資料</p>
                         <p className={styles.project} onClick={()=>(setWhoLight(1))}
                            style={{color:whoLight===1?'var(--text-ttitle-color)':'var(--text-header-color)'}}> <Older/> 訂單查詢</p>
                         <p className={styles.project} onClick={()=>(setWhoLight(2))}
                            style={{color:whoLight===2?'var(--text-ttitle-color)':'var(--text-header-color)'}}> <Love/> 我的收藏</p>
                         <p className={styles.project} onClick={()=>(setWhoLight(3))}
                            style={{color:whoLight===3?'var(--text-ttitle-color)':'var(--text-header-color)'}}> <Brush/> 外觀設定</p>

                    </div>

                </motion.div>
                <motion.div className={styles.right}  {...FadeInOne} key={whoLight}>
                    {renderContent()}
                </motion.div>
             </div>
        </div>
    </>
  )
}

export default MyUserBody