import React, { useState } from 'react';
import styles from './Goodscard.module.css'
import Carouselgoods from '../Carouselgoods/Carouselgoods';
import Shopicon from '../../assets/svg/shop.svg?react';
import Love from '../../assets/svg/love.svg?react';

const Goodscard = ({name,text,price,photos,size}) => {
    const [numbang,SetNumBang]=useState(1);
    const [islove,SetLove]=useState(false);
    const subtraction=()=>{
        SetNumBang(numbang>1?numbang-1:numbang);
    }
    const add=()=>{
        SetNumBang(numbang+1);
    }
    const bangColor=()=>{
        SetLove(!islove);
    }
    
  return (
    <>
        <div className={styles.bg}>
            <div className={`${styles.container} container`}>
                {/* 分成上下兩區，上面圖片和資訊，下面評論 */}
                <div className={styles.up}>
                    <div className={styles.img_div}>
                        <Carouselgoods photos={photos}/>
                    </div>
                    <div className={styles.info}>
                        {/* 商品名稱 */}
                        <h2 className={styles.goods_name}>{name}</h2>
                        <p className={styles.goods_size}>尺寸：約{size}</p>
                        <div className={styles.line}></div>
                        {/* 商品介紹 */}
                        <p className={styles.goods_text}>{text}</p>
                        {/* 價格 */}
                        <div className={styles.price_and_like}>
                            <h3 className={styles.goods_price}>${price}</h3>
                            <Love className={islove?styles.like:styles.nolike} onClick={bangColor}/>
                        </div>

                        {/* 加減商品數量 */}
                        <div className={styles.how_many}> {/* 包住按鈕與數字顯示的區塊 */}
                          <button className={styles.how_many_button} onClick={subtraction}>−</button> {/* 減號按鈕 */}
                          <p className={styles.value}>{numbang}</p> {/* 顯示目前數量 */}
                          <button className={styles.how_many_button} onClick={add}>＋</button> {/* 加號按鈕 */}
                        </div>

                        <button className={styles.buy}> 
                        <Shopicon className={styles.shopicon}/>
                        <p>加入購物車</p>
                        </button>


                    </div>

                    
                </div>
                <div className={styles.down}>

                </div>
            </div>
        </div>
    </>
  )
}

export default Goodscard