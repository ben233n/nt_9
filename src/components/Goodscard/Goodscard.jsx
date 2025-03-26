import React, { useState } from 'react';
import styles from './Goodscard.module.css'
const Goodscard = ({name,text,price}) => {
  return (
    <>
        <div className={styles.bg}>
            <div className={`${styles.container} container`}>
                {/* 分成上下兩區，上面圖片和資訊，下面評論 */}
                <div className={styles.up}>
                    <div className={styles.img_div}>
                        <img src="" alt=""  className={styles.img}/>
                    </div>
                    <div className={styles.info}>
                        {/* 商品名稱 */}
                        <h2 className={styles.goods_name}>{name}</h2>
                        {/* 商品介紹 */}
                        <p className={styles.goods_text}>{text}</p>
                        {/* 價格 */}
                        <h3 className={styles.price}>{price}</h3>
                        {/* 加減商品數量 */}
                        <div>

                        </div>
                        <button className={styles.buy}> 加入購物車</button>
                        <div className={styles.like}></div>
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