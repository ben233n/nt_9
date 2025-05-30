import React from 'react'
import styles from './Compare.module.css'
import { motion } from 'motion/react'
import { DownLook } from '../Anime'
import CompareCard from '../CompareCard/CompareCard'

const taiwan=["贈送一份台灣自然小物","自然資源與產地的合照"];
const asia=["贈送一份亞洲自然小物","自然資源與產地的合照","當地風景明信片","一份當地伴手禮"];
const earth=["贈送一份世界自然小物","自然資源與產地的合照","當地風景明信片","一份當地伴手禮","商品打九折"];
const Compare = () => {
  return (
    <>
        <div className={styles.bg}>
            <div className={`${styles.container} container `}>
                <motion.div className={styles.blog} {...DownLook}>
                    <CompareCard planp={taiwan} planname={"本土拾荒者"} money={199} image={"/img/taiwan.png"}/>
                    <CompareCard planp={asia} planname={"區域收集者"} money={599} image={"/img/asia.png"}/>
                    <CompareCard planp={earth} planname={"地球開拓者"} money={999} image={"/img/earth.png"}/>
                </motion.div>
            </div>
        </div>
    </>
  )
}

export default Compare