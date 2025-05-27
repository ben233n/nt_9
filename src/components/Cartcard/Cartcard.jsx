import React from 'react';
import styles from './Cartcard.module.css';
import { useDispatch } from 'react-redux';
import { cartsub, cartadd, updateQuantity, removeItem } from '../../redux/cartSlice';
import { showToast } from '../../redux/toastSlice';
import { Link } from 'react-router';

const Cartcard = ({ name, num, image, price, idnum, onRemove, choose }) => {
  const dispatch = useDispatch();

  const subtraction = () => {
    if (num === 1) {
      dispatch(showToast("🗑️ 已移除"));
    }
    dispatch(cartsub({ name, style: choose }));
  };

  const add = () => {
    dispatch(cartadd({ name, style: choose }));
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      dispatch(updateQuantity({ name, style: choose, num: value }));
    }
  };

  const remove = () => {
    onRemove(); // 父層控制動畫等
    dispatch(removeItem({ name, style: choose }));
    dispatch(showToast("🗑️ 已移除"));
  };

  return (
    <>
      <div className={styles.bg}>
        <Link to={`/shop/${idnum}`} className={styles.img_div}>
          <img src={image} alt="" className={styles.img} />
        </Link>

        <div className={styles.info}>
          <div className={styles.text_box}>
            <div>
              <Link to={`/shop/${idnum}`} className={styles.name}>{name}</Link>
            </div>
            <p className={styles.p}>{choose}</p>
          </div>

          <div className={styles.price_and_num}>
            <h4 className={styles.price}>NT${price}</h4>

            <div className={styles.how_many}>
              <button className={styles.how_many_button} onClick={subtraction}>−</button>
              <input
                type="number"
                className={styles.value}
                value={num}
                onChange={handleChange}
                min="0"
              />
              <button className={styles.how_many_button} onClick={add}>＋</button>
            </div>

            <button className={styles.close_btn} onClick={remove}>&times;</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cartcard;