import React from 'react'
import { motion } from 'motion/react'
import styles from './CompareCard.module.css'
import { Link } from 'react-router'
import { div } from 'motion/react-client'
import Ok from '../../assets/svg/ok.svg?react'
import { setCheckoutItems, setTotal } from '../../redux/checkoutSlice'; // 根據你的路徑調整
import { useNavigate } from 'react-router';
import { showToast } from '../../redux/toastSlice';
import { useDispatch, useSelector } from 'react-redux'

const CompareCard = ({planname,money,planp,image}) => {
    const user=useSelector(state=>state.auth.user)
    const dispatch=useDispatch();
    const navigate=useNavigate();

    

    const buy=()=>{
        const item = {
            name:planname,
            image,
            price: money,
            // num: numbang,
            // goodsid,
            style: planp,
            mode:2
        };
      
        dispatch(setCheckoutItems([item])); // 將單一商品直接放進結帳項目
        dispatch(setTotal(money));

        
        if (!user) {
          dispatch(showToast("⚠️ 請先登入"));
          navigate('/login?redirect=/cart/step2');
          return;
        }
      

        navigate('/cart/step2'); // 直接跳轉至 Step 2

    }


    return (
        <>
            <div className={styles.bg}>
                <div className={styles.up}>
                    <h3 className={styles.h3}>- {planname} -</h3>
                    <div className={styles.money}>
                        <h2 className={styles.h2}>${money}</h2>
                        <h4 className={styles.h4}>/每月</h4>
                    </div>
                    <button className={styles.buy} onClick={buy}>訂閱方案</button>
                </div>
                <div className={styles.down}>
                    {
                        planp.map((one)=>(
                            <>
                                <div className={styles.p_box}>
                                    <Ok className={styles.ok}/>
                                    <p className={styles.p}>{one}</p>
                                </div>
                            </>
                            
                        ))
                    }
                </div>
            </div>
        </>
      )
}

export default CompareCard