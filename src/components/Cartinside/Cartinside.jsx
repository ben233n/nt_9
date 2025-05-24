import React, { useEffect,useState } from 'react'
import styles from './Cartinside.module.css'
import Cartcard from '../Cartcard/Cartcard'
import { useSelector } from 'react-redux';
import { useMediaQuery } from "react-responsive";
import { AnimatePresence,motion } from "motion/react"
import { DownLook, FadeIn, FadeInOne } from '../Anime';

const Cartinside = () => {
    const cartitems=useSelector(state=>state.cart.cartItems);
    const [moneyTotal,SetMoneyTotal]=useState();
      const [showModal, setShowModal] = useState(false); 
    useEffect(()=>{
        const total = cartitems.reduce((sum, item) => sum + item.price * item.num, 0);
        SetMoneyTotal(total);
    })

    const isMobile = useMediaQuery({ maxWidth: 690 });

    const [removingItems, setRemovingItems] = useState([]); //「哪些商品正在執行移除動畫」
  return (
    <>
        <div className={styles.bg}>
            <div className={`${styles.container} container `}>
                <motion.div className={styles.cart} {...FadeInOne}>
                    <h2 className={styles.h2}>購物清單</h2>
                    <div className={styles.down_line}></div>
                    <div className={styles.card_div}>
                        {
                            cartitems.length===0? (<p className={styles.no_item}>購物車非常乾淨</p>):
                            (

                                <AnimatePresence>
                                  {cartitems.map(items => {
                                    const isRemoving = removingItems.includes(items.goodsid);
                                    return (
                                      !isRemoving && (
                                        <motion.div
                                          key={items.goodsid}
                                          initial={{ opacity: 0, x: -10 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          exit={{ opacity: 0, x: 10 }}
                                          transition={{ duration: 0.3 }}
                                          onAnimationComplete={() => {
                                            // 動畫結束後再 dispatch 移除
                                            if (isRemoving) {
                                              setRemovingItems(prev => prev.filter(id => id !== items.goodsid));
                                            }
                                          }}
                                        >
                                          <Cartcard
                                            idnum={items.goodsid}
                                            price={items.price}
                                            name={items.name}
                                            num={items.num}
                                            image={items.image}
                                            onRemove={() => {
                                              setRemovingItems(prev => [...prev, items.goodsid]);
                                            }}
                                          />
                                        </motion.div>
                                      )
                                    );
                                  })}
                                </AnimatePresence>
                            )
                        }
                    </div>

                </motion.div>
                {!isMobile? (<motion.div className={styles.total} {...FadeInOne}>
                    <div className={styles.total_card}>
                        <h2 className={styles.h2}>摘要</h2>
                        <div className={styles.down_line}></div>
                        <div className={styles.total_p_div}>
                            <p className={styles.total_p}>商品金額</p>
                            <p className={styles.total_p}>${moneyTotal}</p>
                        </div>
                        
                        {
                            cartitems.length>0&&
                        <div className={styles.total_p_div}>
                            <p className={styles.total_p}>估計運費</p>
                            <p className={styles.total_p}>$1200</p>
                        </div>

                        }
                        <div className={styles.down_line}></div>
                        
                        {
                            cartitems.length>0&&
                        <div className={styles.total_p_div}>
                            <p className={styles.total_p}>商品金額</p>
                            <p className={styles.total_p}>${moneyTotal+1200}</p>
                        </div>
                        }
                        <button className={styles.buy}>前往買單</button>
                    </div>
                </motion.div>):(
                    <motion.div className={styles.air} {...FadeInOne}>
                        <div className={styles.phone_total} >
                            <div className={styles.phone_total_info}>
                                <p className={styles.phone_total_p} onClick={()=>setShowModal(true)}>明細</p>
                                <h4 className={styles.total_h4}>總計 ${cartitems.length>0?moneyTotal+1200:moneyTotal}</h4>
                            </div>
                            <button className={styles.phone_buy}> 前往買單</button>
                        </div>
                    </motion.div>
                )
            }
                <AnimatePresence>
                  {showModal && (
                    <motion.div
                      className={styles.overlay}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setShowModal(false)}
                    />
                )}
                </AnimatePresence>
                <motion.div
                    className={styles.total_card}
                    style={{display:isMobile? 'block':'none'}}
                    initial={{ y: "100%" }}
                    animate={{ y: showModal ? "0%" : "100%" }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    >
                        <h2 className={styles.h2}>摘要</h2>
                        <div className={styles.down_line}></div>
                        <div className={styles.total_p_div}>
                            <p className={styles.total_p}>商品金額</p>
                            <p className={styles.total_p}>${moneyTotal}</p>
                        </div>
                        
                        {
                            cartitems.length>0&&
                        <div className={styles.total_p_div}>
                            <p className={styles.total_p}>估計運費</p>
                            <p className={styles.total_p}>$1200</p>
                        </div>
    
                        }
                        <div className={styles.down_line}></div>
                        
                        {
                            cartitems.length>0&&
                        <div className={styles.total_p_div}>
                            <p className={styles.total_p}>商品金額</p>
                            <p className={styles.total_p}>${moneyTotal+1200}</p>
                        </div>
                        }
                        <button className={styles.buy} onClick={()=>setShowModal(false)}>關閉</button>
                </motion.div>
            </div>
                


        </div>
    </>
  )
}

export default Cartinside