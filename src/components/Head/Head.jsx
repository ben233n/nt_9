import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import styles from './Head.module.css'
import Shopicon from '../../assets/svg/shop.svg?react';
import User from '../../assets/svg/user.svg?react';
import Menu from '../../assets/svg/menu.svg?react';
import Logo from '../../assets/svg/logo.svg?react';
import Chacha from '../../assets/svg/chacha.svg?react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion'; // 引入 framer-motion
import { useMediaQuery } from "react-responsive";

const bubbleVariants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    scale: [1.2, 0.95, 1],
    opacity: 1,
    transition: {
      duration: 0.4,
      type: "spring",
      stiffness: 500,
      damping: 20,
    },
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

const Head = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const [isHamburger, SetIsHamburger] = useState(false);
  const [isBubbleVisible, setIsBubbleVisible] = useState(false); // 控制 bubble 是否顯示
  const isMobile = useMediaQuery({ maxWidth: 992 });

  

  // 監聽 cartItems.length 的變化，當變化時顯示動畫
  useEffect(() => {
    if (cartItems.length > 0) {
      setIsBubbleVisible(true); // 當 cartItems 長度改變時顯示動畫
    }
  }, [cartItems.length]);
  useEffect(() => {
    // 每次路由變化時，關閉漢堡選單
    SetIsHamburger(false);
  }, [location.pathname]); // 當 pathname 改變時觸發

  // 避免動畫在首次渲染時觸發
  const bubbleVariants = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    exit: { scale: 0 },
  };

  return (
    <>
      <div className={styles.bg}>
        <div className={`${styles.container} container`}>
          {/* logo */}
          <Link to="/" className={styles.logo}>
            <Logo className={styles.logo} />
          </Link>

          <nav className={styles.nav}>
            <Link to="/" className={styles.nav_li}>首頁</Link>
            <Link to="/shop" className={styles.nav_li}>產品</Link>
            <li className={styles.nav_li}>訂閱</li>
            <Link to="/blog" className={styles.nav_li}>部落格</Link>
          </nav>
          <nav className={styles.nav}>
            {/* 購物車 */}
            <div className={styles.Shopicon_div}>
              <Link to="/cart">
                <Shopicon className={`${styles.shop} ${styles.icon}`} />
              </Link>

              <AnimatePresence>
                {cartItems.length > 0 && isBubbleVisible && ( // 當 cartItems 改變且長度大於0時顯示動畫
                  <motion.div
                    className={styles.bubble}
                    key={cartItems.length}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={bubbleVariants} 
                  >
                    <p className={styles.Shopicon_num}>{cartItems.length}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 使用者 */}
            <User className={`${styles.user} ${styles.icon}`} />
            {/* 漢堡選單 */}
            <Menu className={`${styles.menu} ${styles.icon}`} onClick={() => SetIsHamburger(true)} />
          </nav>
        </div>
      </div>

      {/* 手機版側邊漢堡選單 */}
      <AnimatePresence>
        {(isHamburger && isMobile) && (
          <motion.div
            className={styles.black}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => SetIsHamburger(false)}
            key="black"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(isHamburger && isMobile) &&
          <motion.div
            className={styles.phone_menu}
            key="phone_menu"
            initial={{ x: '100%' }}
            animate={{ x: isHamburger ? "0%" : "100%" }}
            exit={{ x: '100%' }}
            transition={{ type: "Ease Out", stiffness: 300, damping: 20 }}
          >
            <div className={styles.chacha_div}>
              <Link to="/" className={styles.logo}>
                <Logo className={styles.logo} />
              </Link>
              <Chacha className={styles.chacha} onClick={() => SetIsHamburger(false)} />
            </div>
            <ul className={styles.phone_ul}>
              <Link to="/" className={styles.nav_li}>首頁</Link>
              <Link to="/shop" className={styles.nav_li}>產品</Link>
              <li className={styles.nav_li}>訂閱</li>
              <Link to="/blog" className={styles.nav_li}>部落格</Link>
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