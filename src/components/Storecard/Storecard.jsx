import React from 'react'
import styles from './Storecard.module.css'
import Love from '../../assets/svg/love.svg?react';
import Car from '../../assets/svg/itemshopcar.svg?react';
import { Link, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import {addItems} from '../../redux/cartSlice'
import { motion } from "motion/react"
import { showToast } from '../../redux/toastSlice';

const Storecard = ({name,price,image,itemid,isone}) => {
    const dispatch=useDispatch();

    const navigate=useNavigate();

    const goto=()=>{
        navigate(`/shop/${itemid}`);
    }

    const buyGoods=(e)=>{
        e.stopPropagation();
        const item = {
            name: name,  // 商品名稱
            image: image,    // 商品圖片
            price:price,
            num:1,
            goodsid:itemid,

          };
        dispatch(addItems(item));
        dispatch(showToast("🛒 已加入購物車"));
        
    }

    const love=(e)=>{
        e.stopPropagation();
        dispatch(showToast("❤️ 已加入收藏"));
        
    }

  return (
    <>
        <div className={isone?styles.one_card:styles.card} onClick={goto}>
            <div className={styles.img_div}>
                <img src={image} alt="" className={styles.img}/>
            </div>
            <div className={styles.content} >
                <h3 className={styles.name}>{name}</h3>
                <div className={styles.down}>
                    <h4 className={styles.h4}>${price}</h4>
                    <div className={styles.icon_div}>
                        <Love className={styles.icon} onClick={love}/>
                        <Car className={styles.icon} onClick={buyGoods}/>
                    </div>
                </div>
            </div>
        </div>
    </>

  )
}

export default Storecard