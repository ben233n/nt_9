import React, { useState } from 'react'
import styles from './Cartcard.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { cartsub, cartadd,updateQuantity,removeItem } from '../../redux/cartSlice';
import { showToast } from '../../redux/toastSlice';
import { Link } from 'react-router';

const Cartcard = ({name,num,image,price,idnum,onRemove}) => {
  const dispatch=useDispatch();

  const subtraction = () => {
    if (num === 1) {
      dispatch(showToast("🗑️ 已移除"));
    }
    dispatch(cartsub({ name }));
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
    onRemove(); // 不直接 dispatch，交給父層控制 timing
    dispatch(removeItem({name}));
    dispatch(showToast("🗑️ 已移除"));
  }

  return (
    <>
      <div className={styles.bg}>
        <Link to={`/shop/${idnum}`} className={styles.img_div}>
         <img src={image} alt="" className={styles.img}/>
         </Link>
        <div className={styles.info}>
          <Link to={`/shop/${idnum}`} className={styles.name}>{name}</Link>
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