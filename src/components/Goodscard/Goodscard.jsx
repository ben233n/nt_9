import React, { useState, useEffect } from 'react';
import styles from './Goodscard.module.css'
import Carouselgoods from '../Carouselgoods/Carouselgoods';
import Shopicon from '../../assets/svg/shop.svg?react';
import Love from '../../assets/svg/loveair.svg?react';
import Storecard from '../Storecard/Storecard';
import Message from '../Message/Message';
import { useDispatch } from 'react-redux';
import {addItems} from '../../redux/cartSlice'
import { useSelector } from 'react-redux';
import { motion } from "motion/react"
import { DownLook, LeftLook } from '../Anime';
import { useMediaQuery } from "react-responsive";
import { showToast } from '../../redux/toastSlice';
import { useQuery } from '@tanstack/react-query';
import { fetchStores } from '../../api/firestore/fetchStores'; 
import { addFavorite, removeFavorite } from '../../redux/favoriteSlice'; // Redux 收藏
import { toggleFavorite } from '../../api/firestore/favoriteService'; // Firestore 收藏
import Star from "../../assets/svg/star.svg?react";
import Receipt from "../../assets/svg/receipt.svg?react";
import { setCheckoutItems, setTotal } from '../../redux/checkoutSlice'; // 根據你的路徑調整
import { useNavigate } from 'react-router';

const Goodscard = ({name,text,price,photos,size,category,image,goodsid,star}) => {

  const navigate=useNavigate();

    const cartItems=useSelector(state=> state.cart.cartItems); //全域狀態變數 購物車內的東西

    const [selectedStyle, setSelectedStyle] = useState('標準版');
    const [numbang,SetNumBang]=useState(1);
    const [islove,SetLove]=useState(false);
    const [money,setMoney]=useState(price);//價格，有沒有豪華版的價格，有加350元
    
    const chooseSimple=()=>{
      setSelectedStyle('標準版');
      setMoney(price);
    }

    const chooseVIP=()=>{
      setSelectedStyle('豪華套裝(證書+商品特寫照+精美包裝)');
      setMoney(price+350);
    }

    const dispatch = useDispatch(); // 初始化 dispatch 來執行 action

    const user = useSelector(state => state.auth.user); // 目前登入者
    const favoriteList = useSelector(state => state.favorites.items); // 收藏清單
    const isFavorite = favoriteList.includes(goodsid); // 判斷是否收藏此商品


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

    const bangColor = async () => {
        if (!user) return;
      
        try {
          await toggleFavorite(user.uid, goodsid, isFavorite); // Firebase 同步
          if (isFavorite) {
            dispatch(removeFavorite(goodsid)); // Redux：移除
            dispatch(showToast("💔 已移除收藏"));
          } else {
            dispatch(addFavorite(goodsid)); // Redux：新增
            dispatch(showToast("❤️ 已加入收藏"));
          }
        } catch (error) {
          dispatch(showToast("⚠️ 收藏操作失敗"));
          console.error("收藏切換失敗:", error);
        }
      };

      const buyGoods = () => {
        if (!selectedStyle) {
          dispatch(showToast("⚠️ 請先選擇款式"));
          return;
        }
        if (numbang <= 0 || isNaN(numbang)) {
          dispatch(showToast("⚠️ 請選擇數量"));
          return;
        }
      
        const item = {
          name,
          image,
          price:money,
          num: numbang,
          goodsid,
          style: selectedStyle // 將款式加進商品項目
        };
        dispatch(addItems(item));
        dispatch(showToast("🛒 已加入購物車"));
      };


      const buyNow = () => {
        if (!user) {
          dispatch(showToast("⚠️ 請先登入"));
          navigate('/login?redirect=/cart/step2');
          return;
        }
        if (!selectedStyle) {
          dispatch(showToast("⚠️ 請先選擇款式"));
          return;
        }
        if (numbang <= 0 || isNaN(numbang)) {
          dispatch(showToast("⚠️ 請選擇數量"));
          return;
        }
      
        const item = {
          name,
          image,
          price: money,
          num: numbang,
          goodsid,
          style: selectedStyle,
        };
      
        dispatch(setCheckoutItems([item])); // 將單一商品直接放進結帳項目
        dispatch(setTotal(money * numbang + 1200)); // 加入運費
        navigate('/cart/step2'); // 直接跳轉至 Step 2
      };

    const isMobile = useMediaQuery({ maxWidth: 690 });



    const { data, isLoading, isError } = useQuery({
        queryKey: ['stores'],         // 快取的 key 名稱
        queryFn: fetchStores          // API 函數
      });

      const product = data?.find(item => item.name === name);//尋找我商品的留言用的
    
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
                        <div  className={styles.star_box}>
                                <div className={styles.star}>
                                {Array.from({ length: 5 }, (_, index) => {
                                  const full = index + 1 <= Math.floor(star); // 滿星
                                  const half = index + 1 === Math.ceil(star) && star % 1 !== 0; // 半星
                                  const empty = !full && !half; // 空星
                                                                
                                  return (
                                    <div key={index} className={styles.star_wrapper}>
                                      {/* 滿星 */}
                                      {full && <Star className={styles.star_icon} />}
                                      
                                      {/* 半星（要背景星 + 一半的深色星）*/}
                                      {half && (
                                        <>
                                          <Star className={styles.star_no_icon} />
                                          <div className={styles.half_star}>
                                            <Star className={styles.star_icon} />
                                          </div>
                                        </>
                                      )}
                                
                                      {/* 空星 */}
                                      {empty && <Star className={styles.star_no_icon} />}
                                    </div>
                                  );
                                })}
                                </div>
                                <p className={styles.star_num}>{star}</p>
                            </div>
                        {/* <p className={styles.goods_size}>尺寸：約{size}</p> */}
                        {/* <div className={styles.line}></div> */}
                        {/* 商品介紹 */}
                        <p className={styles.goods_text}>{text}</p>
                        {/* 價格 */}
                                      <div className={styles.line}></div>
                        <div className={styles.price_and_like}>
                            <h3 className={styles.goods_price}>NT${money}</h3>
                            
                        </div>

                        <div className={styles.choose}>
                          <div className={styles.label}>選擇</div>
                          <div className={styles.choose_btn_box}>
                            <button
                              className={`${styles.choose_btn} ${selectedStyle === '標準版' ? styles.selected : ''}`}
                              onClick={chooseSimple}
                            >
                             標準版
                            </button>
                            <button
                              className={`${styles.choose_btn} ${selectedStyle === '豪華套裝(證書+商品特寫照+精美包裝)' ? styles.selected : ''}`}
                              onClick={chooseVIP}
                            >
                              豪華套裝(證書+商品特寫照+精美包裝)
                            </button>
                          </div>
                        </div>

                        <div className={styles.choose}>
                          {/* 加減商品數量 */}
                          <div className={styles.label}>數量</div>
                          <div className={styles.how_many}> {/* 包住按鈕與數字顯示的區塊 */}
                            <div className={styles.how_many_button} onClick={subtraction}>−</div> {/* 減號按鈕 */}
                            <input
                             type="number"
                             className={styles.value} // 原本 p 的樣式也可應用在 input 上，或微調
                             value={numbang}
                             onChange={handleChange}
                             min="0"
                           />
                            <div className={styles.how_many_button} onClick={add}>＋</div> {/* 加號按鈕 */}
                          </div>
                        </div>
                        

                        <div className={styles.btn_box}>
                          <button className={styles.buy_air} onClick={buyGoods}> 
                          <Shopicon className={styles.shopicon}/>
                          <p>加入購物車</p>
                          </button>

                          <button className={styles.buy} onClick={buyNow}> 
                            <Receipt className={styles.shopicon}/>
                            <p>立刻結帳</p>
                          </button>
                        </div>

                        <div className={styles.love_box} onClick={bangColor}>
                          <Love className={isFavorite?styles.like:styles.nolike} />
                          {isFavorite?(
                            <p className={isFavorite?styles.love_p:styles.nolove_p}>已加入收藏</p>):
                            (<p className={isFavorite?styles.love_p:styles.nolove_p}>加入收藏清單</p>)
                          }                         
                        </div>
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
                                    <Message key={`${item.usename}-${item.date}`} date={item.date} usename={item.usename} ueshead={item.head} star={item.star} speak={item.speak}/>
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
                                data?.filter(item=>
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