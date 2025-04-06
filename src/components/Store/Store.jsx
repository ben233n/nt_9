import React from 'react'
import { Ad } from '../Ad/Ad'
import { useState, useEffect} from "react";
import { AnimatePresence,motion } from "motion/react"

import Magnifier from '../../assets/svg/magnifier.svg?react';
import styles from './Store.module.css';
import Storecard from '../Storecard/Storecard';
import Title from '../Title/Title';


const categorBtn = ["全部", "自然植物", "沙子土壤", "水資源", "岩石", "空氣"];



const Store = () => {
  // 下面是匯入檔案的動態資料變數
  const [data, setData] = useState([]); // 存放商品資料
  const [loading, setLoading] = useState(true); // 是否正在載入
  const [error, setError] = useState(null); // 錯誤訊息

  //下面是動態資料變數，分類、關鍵字搜尋、最高最低價格
  const [storeCategory, setStoreCategory] = useState("全部");
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");

  //彈跳視窗
  const [showModal, setShowModal] = useState(false); 

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
  // if (loading) return <p>載入中...</p>;
  // if (error) return <p>錯誤: {error}</p>;




  const storeFind = data.filter(
    (item)=>{
      const storeCategoryBool= storeCategory==="全部" || storeCategory === item.category;
      const searchBool=item.name.includes(search);
      const priceBool =
        (!minPrice || Number(item.price) >= Number(minPrice)) &&
        (!maxPrice || Number(item.price) <= Number(maxPrice));
      return (storeCategoryBool && searchBool && priceBool)
    }
  )



  return (
    <>
      <Ad/>
      <div className={styles.bg}>
        <div className={`${styles.container} container`}>
          <div className={styles.choose}>
            <h2 className={styles.h2}>商品分類</h2>
            <div className={styles.line}></div>
            <div className={styles.div_classbtn}>
              {
                categorBtn.map((btn)=>(
                  <button key={btn} onClick={()=>setStoreCategory(btn)} className={`${styles.classbtn} ${storeCategory===btn?styles.active:""}`}>
                    {btn}
                  </button>
                ))
              }
            </div>
            <h2 className={styles.h2}>價格區間</h2>
            <div className={styles.line}></div>
            <div className={styles.interval_div}>
              <div className={styles.price_input_div}>
                <label htmlFor="minp" className={styles.label}>最低</label>     
                <input 
                  placeholder="--" 
                  type="number" 
                  id="minp" 
                  value={minPrice}
                  className={styles.price_input}
                  onChange={(e)=>setMinPrice(e.target.value)} 
                />
              </div>
              <div className={styles.price_line}></div>
              <div className={styles.price_input_div}>
                <label htmlFor="maxp" className={styles.label}>最高</label>     
                <input 
                  placeholder="--" 
                  type="number" 
                  id="maxp" 
                  value={maxPrice}
                  className={styles.price_input}
                  onChange={(e)=>setMaxPrice(e.target.value)} 
                />
              </div>
            </div>
          </div>
          <div className={styles.goods}>
            <div className={styles.goods_up}>
              <h2 className={styles.h2}>商品</h2>
              <div className={styles.search_container}>
                <input className={styles.search_input} value={search} type="text"  placeholder="搜尋商品..."  onChange={(e)=>setSearch(e.target.value)}/>
                <Magnifier className={styles.magnifier}/>
              </div>
            </div>
            <div className={styles.goods_up_phone}>
              <Title bigtitle="自然商店"/>
              <div className={styles.check_div}>
                <select id="season" className={styles.phonebtn} onChange={(e)=>setStoreCategory(e.target.value)}>
                  {
                    categorBtn.map((btn)=>(
                      <option key={btn} value={btn} >分類：{btn}</option>
                    ))
                  }
                </select>
                <button className={styles.filter_btn} onClick={() => setShowModal(true)}>篩選</button>
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
                  className={styles.modal}
                  initial={{ y: "100%" }}
                  animate={{ y: showModal ? "0%" : "100%" }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  >
                  <button className={styles.close_btn} onClick={() => setShowModal(false)}>&times;</button>
                  <div className={styles.phone_search_div}>
                    <label className={styles.label} htmlFor="phone_search" >搜尋商品</label>  
                    <input id="phone_search" className={styles.phone_search} value={search} type="text"  placeholder="輸入商品名稱..."  onChange={(e)=>setSearch(e.target.value)}/>
                  </div>
                  <div className={styles.phone_line}></div>
                  <h2 className={styles.label}>價格區間</h2>
                  <div className={styles.line}></div>
                  <div className={styles.money_div}>
                    <div className={styles.price_input_div}>
                      <label htmlFor="minp_phone" className={styles.label}>最低</label>     
                      <input 
                        placeholder="--" 
                        type="number" 
                        id="minp_phone" 
                        value={minPrice}
                        className={styles.price_input_phone}
                        onChange={(e)=>setMinPrice(e.target.value)} 
                      />
                    </div>
                    <div className={styles.price_line_phone}></div>
                    <div className={styles.price_input_div}>
                      <label htmlFor="maxp_phone" className={styles.label}>最高</label>     
                      <input 
                        placeholder="--" 
                        type="number" 
                        id="maxp_phone" 
                        value={maxPrice}
                        className={styles.price_input_phone}
                        onChange={(e)=>setMaxPrice(e.target.value)} 
                      />
                    </div>
                  </div>
                  <button className={styles.ok_btn} onClick={() => setShowModal(false)}>篩選</button>
                </motion.div>
              </div>

            </div>
            
            <div className={styles.line}></div>
            <div className={styles.card_div}>
              {
                storeFind.length>0?(
                  storeFind.map((goodsitem)=>(
                    <>
                      <Storecard key={goodsitem.id} isone={false} itemid={goodsitem.id} name={goodsitem.name} price={goodsitem.price} image={goodsitem.image}/>
                    </>
                  )
                  )
                ):(
                  <p className={styles.label} style={{width:'100%',textAlignLast:'center'}}>找不到相關商品</p>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Store