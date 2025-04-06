import React, { useState, useEffect } from 'react';
import styles from './Goodscard.module.css'
import Carouselgoods from '../Carouselgoods/Carouselgoods';
import Shopicon from '../../assets/svg/shop.svg?react';
import Love from '../../assets/svg/love.svg?react';
import Storecard from '../Storecard/Storecard';
import { map } from 'motion/react-client';
import Message from '../Message/Message';

const Goodscard = ({name,text,price,photos,size,category}) => {
    const [data, setData] = useState([]); // 存放商品資料
    const [loading, setLoading] = useState(true); // 是否正在載入
    const [error, setError] = useState(null); // 錯誤訊息

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

    useEffect(() => {
        fetch("/json/store.json") // 從 public/json/store.json 載入
          .then((res) => {
            if (!res.ok) {
              throw new Error("無法載入商品資料");
            }
            return res.json();
          })
          .then((json) => {
            setData(json);
            setLoading(false);
          })
          .catch((err) => {
            setError(err.message);
            setLoading(false);
          });
      }, []);

      const product = data.find(item => item.name === name);//尋找我商品的留言用的
    
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
                    {/* 留言區在左邊 */}
                    <div className={styles.message_div}>
                        <h2 className={styles.h2}>顧客評價</h2>
                        <div className={styles.down_line}></div>
                        <div className={styles.message}>
                            {
                                product?.message?.map(item=>(
                                    <Message date={item.date} usename={item.usename} ueshead={item.head} star={item.star} speak={item.speak}/>
                                ))
                            }
                            
                            
                        </div>
                    </div>
                    {/* 推薦商品在右邊 */}
                    <div className={styles.advise}>
                        <h2 className={styles.h2}>類似商品</h2>
                        <div className={styles.down_line}></div>
                        <div className={styles.storecard_div}>
                            {
                                data.filter(item=>
                                    item.category===category && item.name!=name
                                ).slice(0, 3).map(item=>(
                                    <Storecard key={item.id} isone={true} name={item.name} price={item.price} image={item.image} itemid={item.id}/>
                                ))
                            }
                        </div>

                        
                        
                        
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Goodscard