import React, { useState } from 'react'
import styles from './Cartcard.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { cartsub, cartadd,updateQuantity,removeItem } from '../../redux/cartSlice';

const Cartcard = ({name,num,image,price,idnum}) => {
  const dispatch=useDispatch();

  const subtraction=()=>{
    dispatch(cartsub({name}));
  }
  const add=()=>{
      dispatch(cartadd({name}));

  }
  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      dispatch(updateQuantity({ name, num: value }));
    }
  }
  const remove=()=>{
    dispatch(removeItem({name}));
  }

  return (
    <>
      <div className={styles.bg}>
        <div className={styles.img_div}>
         <img src={image} alt="" className={styles.img}/>
         </div>
        <div className={styles.info}>
          <h3 className={styles.name}>{name}</h3>
          <div className={styles.price_and_num}>
            <h4 className={styles.price}>${price}</h4>
            
            {/* 加減商品數量 */}
            <div className={styles.how_many}> {/* 包住按鈕與數字顯示的區塊 */}
              <button className={styles.how_many_button} onClick={subtraction}>−</button> {/* 減號按鈕 */}
              <input
               type="number"
               className={styles.value} // 原本 p 的樣式也可應用在 input 上，或微調
               value={num}
               onChange={handleChange}
               min="0"
             />
              <button className={styles.how_many_button} onClick={add}>＋</button> {/* 加號按鈕 */}
            </div>
            <button className={styles.close_btn} onClick={remove}>&times;</button>
          </div>


        </div>
      </div>

    </>
  )
}

export default Cartcard