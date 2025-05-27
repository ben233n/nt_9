import React, { useEffect,useState } from 'react'
import styles from './CartGoods.module.css'

import Cartcard from '../Cartcard/Cartcard'
import { useSelector } from 'react-redux';
import { useMediaQuery } from "react-responsive";
import { AnimatePresence,motion } from "motion/react"
import { DownLook, FadeIn, FadeInOne } from '../Anime';

const CartGoods = () => {
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
    <div className={styles.bg}>
        <div className={`${styles.container} container `}>
            <div className={styles.left}>
                <h3 className={styles.h3}>購物清單</h3>

                <div className={styles.card_div}>
                        {
                            cartitems.length===0? (<p className={styles.no_item}>購物車非常乾淨</p>):
                            (

                              <AnimatePresence>
                                {cartitems.map(item => {
                                  const uniqueKey = `${item.name}-${item.style}`;
                                  const isRemoving = removingItems.includes(uniqueKey);

                                  return (
                                    <motion.div
                                      key={uniqueKey}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      exit={{ opacity: 0, x: 10 }}
                                      transition={{ duration: 0.3 }}
                                    >
                                      {!isRemoving && (
                                        <Cartcard
                                          idnum={item.goodsid}
                                          price={item.price}
                                          name={item.name}
                                          num={item.num}
                                          image={item.image}
                                          choose={item.style}
                                          onRemove={(callback) => {
                                            setRemovingItems(prev => [...prev, uniqueKey]);
                                            setTimeout(() => {
                                              callback(); // 執行實際移除 Redux 的動作
                                              setRemovingItems(prev => prev.filter(id => id !== uniqueKey));
                                            }, 300); // 等動畫跑完再刪除
                                          }}
                                        />
                                      )}
                                    </motion.div>
                                  );
                                })}
                              </AnimatePresence>
                            )
                        }
                    </div>
            </div>
            <div className={styles.right}>
                <h3 className={styles.h3}>訂單資訊</h3>

                <div>
                  
                </div>
            </div>
        </div>  
    </div>
  )
}

export default CartGoods