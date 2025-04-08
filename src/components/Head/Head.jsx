import React, { use, useState } from 'react'
import { Link } from 'react-router'
import styles from './Head.module.css'
import Shopicon from '../../assets/svg/shop.svg?react';
import User from '../../assets/svg/user.svg?react';
import Menu from '../../assets/svg/menu.svg?react';
import Logo from '../../assets/svg/logo.svg?react';
import Chacha from '../../assets/svg/chacha.svg?react';
import { useSelector } from 'react-redux';
import { motion,AnimatePresence } from 'motion/react';
import { useMediaQuery } from "react-responsive";

const Head = () => {
  const cartItems=useSelector(state=> state.cart.cartItems);
  const [isHamburger,SetIsHamburger]=useState(false);

  const HamburgerClick=()=>{
    SetIsHamburger(!isHamburger);
  }

  const isMobile = useMediaQuery({ maxWidth: 992 });

  return (
    <>
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
            <div className={styles.Shopicon_div}>
              <Link to="/cart"><Shopicon className={`${styles.shop} ${styles.icon}`} /></Link> 
              <div className={styles.bubble} style={{display:cartItems.length>0?'flex':'none'}}>
                  <p className={styles.Shopicon_num} >{cartItems.length}</p>
              </div>
      
            </div>
      
      
            {/* 使用者 */}
            <User className={`${styles.user} ${styles.icon}`}/>
            {/* 漢堡選單 */}
            <Menu className={`${styles.menu} ${styles.icon}`} onClick={()=>SetIsHamburger(true)}/>
          </nav>
        </div>
      </div>
      {/* 手機版側邊漢堡選單 */}
      <AnimatePresence>
        {(isHamburger  && isMobile) && (
          <motion.div
            className={styles.black}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={()=>SetIsHamburger(false)}
            key="black"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        { (isHamburger  && isMobile)&&
              <motion.div
                className={styles.phone_menu}
                key="phone_menu"
                initial={{x:'100%'}}
                animate={{ x: isHamburger ? "0%" : "100%" }}
                exit={{x:'100%'}}
                transition={{ type: "Ease Out", stiffness: 300, damping: 20 }}
              >
                <div className={styles.chacha_div}>
                  <Link to="/" className={styles.logo}>
                    <Logo className={styles.logo}/>
                  </Link>
                  <Chacha className={styles.chacha} onClick={()=>SetIsHamburger(false)}/>
                </div>
                <ul className={styles.phone_ul}>
                  <Link to="/" className={styles.nav_li}>首頁</Link>
                  <Link to="/shop/" className={styles.nav_li}>商品</Link>
                  <li className={styles.nav_li}>訂閱方案</li>
                  <li className={styles.nav_li}>關於我們</li>
                </ul>
                <ul className={styles.phone_ul}>
                  <Link to="/cart" className={styles.nav_li}>購物車</Link>
                  <li className={styles.nav_li}>會員中心</li>

                </ul>

              </motion.div>
        }
      </AnimatePresence>
  </>
  )
}

export default Head