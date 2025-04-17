import React, { useState, useEffect } from 'react';
import styles from './Goodscard.module.css'
import Carouselgoods from '../Carouselgoods/Carouselgoods';
import Shopicon from '../../assets/svg/shop.svg?react';
import Love from '../../assets/svg/love.svg?react';
import Storecard from '../Storecard/Storecard';
import Message from '../Message/Message';
import { useDispatch } from 'react-redux';
import {addItems} from '../../redux/cartSlice'
import { useSelector } from 'react-redux';
import { motion } from "motion/react"
import { DownLook, LeftLook } from '../Anime';
import { useMediaQuery } from "react-responsive";
import { showToast } from '../../redux/toastSlice';


const Goodscard = ({name,text,price,photos,size,category,image,goodsid}) => {
    const cartItems=useSelector(state=> state.cart.cartItems); //全域狀態變數 購物車內的東西
    const [data, setData] = useState([]); // 存放商品資料
    const [loading, setLoading] = useState(true); // 是否正在載入
    const [error, setError] = useState(null); // 錯誤訊息

    const [numbang,SetNumBang]=useState(1);
    const [islove,SetLove]=useState(false);

    const dispatch = useDispatch(); // 初始化 dispatch 來執行 action

    const subtraction=()=>{
        SetNumBang(numbang>1?numbang-1:numbang);
    }
    const add=()=>{
        SetNumBang(numbang+1);
    
    }
    const handleChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= 0) {
            SetNumBang(value);
        } else {
            SetNumBang('');
        }
    }



    const bangColor=()=>{
        SetLove(!islove);
        if(!islove){
            dispatch(showToast("❤️ 已加入收藏"));
        }
    }

    const buyGoods=()=>{
        const item = {
            name: name,  // 商品名稱
            image: image,    // 商品圖片
            price:price,
            num:numbang,
            goodsid:goodsid,

          };
        dispatch(addItems(item));
        dispatch(showToast("🛒 已加入購物車"));
    }

    const isMobile = useMediaQuery({ maxWidth: 690 });


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
                <motion.div className={styles.up} {...DownLook}>
                    <div className={styles.img_div}>
                        <Carouselgoods photos={photos}/>
                    </div>
                    <motion.div className={styles.info} {...!isMobile ? LeftLook : {}}>
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
                          <input
                           type="number"
                           className={styles.value} // 原本 p 的樣式也可應用在 input 上，或微調
                           value={numbang}
                           onChange={handleChange}
                           min="0"
                         />
                          <button className={styles.how_many_button} onClick={add}>＋</button> {/* 加號按鈕 */}
                        </div>

                        <button className={styles.buy} onClick={buyGoods}> 
                        <Shopicon className={styles.shopicon}/>
                        <p>加入購物車</p>
                        </button>


                    </motion.div>

                    
                </motion.div>
                <div className={styles.down} >
                    {/* 留言區在左邊 */}
                    <motion.div className={styles.message_div} {...DownLook}>
                        <h2 className={styles.h2}>顧客評價</h2>
                        <div className={styles.down_line}></div>
                        <div className={styles.message}>
                            {
                                product?.message?.map(item=>(
                                    <Message key={item.id} date={item.date} usename={item.usename} ueshead={item.head} star={item.star} speak={item.speak}/>
                                ))
                            }                            
                        </div>
                    </motion.div>
                    {/* 推薦商品在右邊 */}
                    <motion.div className={styles.advise} {...DownLook}>
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

                        
                        
                        
                    </motion.div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Goodscard