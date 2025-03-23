import React from 'react'
import { Link } from 'react-router'
import styles from './Head.module.css'
import Shopicon from '../../assets/svg/shop.svg?react';
import User from '../../assets/svg/user.svg?react';
import Menu from '../../assets/svg/menu.svg?react';
import Logo from '../../assets/svg/logo.svg?react';

const Head = () => {
  return (
    <div className={styles.bg}>
    <div className={`${styles.container} container `}>
      {/* logo */} 
      <Link to="/" className={styles.logo}>
        <Logo className={styles.logo}/>
      </Link>

      <nav className={styles.nav}>    
        <Link to="/" className={styles.nav_li}>首頁</Link>
        <Link to="/shop/" className={styles.nav_li}>商品</Link>
        <li className={styles.nav_li}>訂閱方案</li>
        <li className={styles.nav_li}>關於我們</li>
      </nav>
      <nav className={styles.nav}>   
        {/* 購物車 */} 
        <Shopicon className={`${styles.shop} ${styles.icon}`}/>
        {/* 使用者 */}
        <User className={`${styles.user} ${styles.icon}`}/>
        {/* 漢堡選單 */}
        <Menu className={`${styles.menu} ${styles.icon}`}/>
      </nav>
    </div>
  </div>
  )
}

export default Head