import React from 'react'
import styles from './Foot.module.css'
import Fb from '../../assets/svg/fb.svg?react'
import Ig from '../../assets/svg/ig.svg?react'
import Gmail from '../../assets/svg/gmail.svg?react'
import Logo from '../../assets/svg/logo.svg?react'
import { Link } from 'react-router'
const Foot = () => {
  return (
    <>
      <div className={styles.up}>
        <div className={`${styles.container} container `}>
          <div className={styles.call}>
            <Link to="/"><Logo className={styles.logo}/></Link>
            <div className={styles.dividing_line}></div>
            <div className={styles.text}>
              <p className={styles.p}>服務時間 周一至周五 09:00 - 18:00</p>
              <p className={styles.p}>連絡電話 02-4129-8890</p>
              <p className={styles.p}>電子信箱 naturo@gmail.com</p>
            </div>
            
            <div className={styles.div_icon}>
              <a href="https://www.instagram.com/the.dtd_bk/" target="_blank"><Fb className={styles.icon}/></a>
              <a href="https://www.instagram.com/the.dtd_bk/" target="_blank"><Ig className={styles.icon}/></a>
              <a href="https://www.instagram.com/the.dtd_bk/" target="_blank"><Gmail className={styles.icon}/> </a> 
            </div>
          </div>
          <div className={styles.map}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2322274.7177771004!2d9.674332642134189!3d17.07031329802395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1199ec7ac6a1af5d%3A0xc933920a158e24d4!2z5bC85pel!5e0!3m2!1szh-TW!2stw!4v1741659567239!5m2!1szh-TW!2stw"   allowfullscreen="" loading="lazy" className={styles.map_map}></iframe>
          </div>
        </div>
      </div>
      <div className={styles.down}>
          <p className={styles.copyright}>© 2025 Naturo All Rights Reserved.</p>
      </div>
    </>
  )
}

export default Foot