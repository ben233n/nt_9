import React, { useEffect,useState } from 'react'
import styles from './CartGoods.module.css'

import Cartcard from '../Cartcard/Cartcard'
import { useSelector } from 'react-redux';
import { useMediaQuery } from "react-responsive";
import { AnimatePresence,motion } from "motion/react"
import { DownLook, FadeIn, FadeInOne } from '../Anime';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setCheckoutItems, setTotal } from '../../redux/checkoutSlice'; // 根據你的路徑調整
import { showToast } from '../../redux/toastSlice'; // 根據你的路徑調整

const CartGoods = ({setStep}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(state => state.auth.user); // 取得登入狀態


     const cartitems=useSelector(state=>state.cart.cartItems);
        const [moneyTotal,SetMoneyTotal]=useState(0);
          const [showModal, setShowModal] = useState(false); 
        useEffect(()=>{
            const total = cartitems.reduce((sum, item) => sum + item.price * item.num, 0);
            SetMoneyTotal(total);
        })
    
        const isMobile = useMediaQuery({ maxWidth: 992 });
    
        const [removingItems, setRemovingItems] = useState([]); //「哪些商品正在執行移除動畫」

        const goToStep2=()=>{
          if (!user) {
            dispatch(showToast("⚠️ 請先登入"));
            navigate('/login?redirect=/cart/step2');
            return;
          }

          if(cartitems.length<=0){
            dispatch(showToast(" 🈚️ 購物車是空的"));
            return
          }

          dispatch(setCheckoutItems(cartitems));
          dispatch(setTotal(moneyTotal + 1200));
          navigate('/cart/step2'); // 導向結帳第二步
        }

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
                <div className={styles.details}>
                  <div className={styles.one_money_info}>
                    <p className={styles.p}>商品金額</p>
                    <p className={styles.p}>{moneyTotal}</p>
                  </div>
                  <div className={styles.one_money_info}>
                    <p className={styles.p}>估計運費</p>
                    <p className={styles.p}>1200</p>
                  </div>
                </div>
                <div className={styles.details}>
                  <div className={styles.one_money_info}>
                    <p className={styles.p}>商品總額</p>
                    <p className={styles.p}>{moneyTotal+1200}</p>
                  </div>
                  
                </div>
                <button className={styles.buy} onClick={goToStep2}> 前往買單</button>
            </div>
        </div>  
        { isMobile &&(
          <>
            <motion.div className={styles.air} {...FadeInOne}>
                    <div className={styles.phone_total_info}>
                        <p className={styles.phone_total_p} onClick={()=>setShowModal(true)}>明細</p>
                        <h3 className={styles.total_h3}>總計 ${cartitems.length>0?moneyTotal+1200:moneyTotal}</h3>
                    </div>
                    <button className={styles.phone_buy} onClick={goToStep2}> 前往買單</button>
            </motion.div>
          </>

        )}

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
               <h3 className={styles.h3}>訂單資訊</h3>
                <div className={styles.details}>
                <div className={styles.one_money_info}>
                  <p className={styles.p}>商品金額</p>
                  <p className={styles.p}>{moneyTotal}</p>
                </div>
                <div className={styles.one_money_info}>
                  <p className={styles.p}>估計運費</p>
                  <p className={styles.p}>1200</p>
                </div>
              </div>
              <div className={styles.details}>
                <div className={styles.one_money_info}>
                  <p className={styles.p}>商品總額</p>
                  <p className={styles.p}>{moneyTotal+1200}</p>
                </div>
                
              </div>
              <button className={styles.buy} onClick={()=>setShowModal(false)}>關閉</button>
        </motion.div>
    </div>
  )
}

export default CartGoods