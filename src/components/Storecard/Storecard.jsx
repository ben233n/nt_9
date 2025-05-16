import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from './Storecard.module.css'
import Love from '../../assets/svg/love.svg?react';
import Car from '../../assets/svg/itemshopcar.svg?react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { addItems } from '../../redux/cartSlice'
import { showToast } from '../../redux/toastSlice';

const Storecard = ({ name, price, image, itemid, isone, loading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goto = () => {
    if (!loading) navigate(`/shop/${itemid}`);
  }

  const buyGoods = (e) => {
    e.stopPropagation();
    if (loading) return;
    const item = {
      name: name,
      image: image,
      price: price,
      num: 1,
      goodsid: itemid,
    };
    dispatch(addItems(item));
    dispatch(showToast("🛒 已加入購物車"));
  }

  const love = (e) => {
    e.stopPropagation();
    if (loading) return;
    dispatch(showToast("❤️ 已加入收藏"));
  }

  return (
    <div className={isone ? styles.one_card : styles.card} onClick={goto}>
      <div className={styles.img_div}>
        {loading ? (
          <Skeleton width="100%" height="100%"  baseColor="var(--loading-color)" />
        ) : (
          <img src={image} alt="" className={styles.img} />
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>
          {loading ? <Skeleton width={120}  baseColor="var(--loading-color)"/> : name}
        </h3>
        <div className={styles.down}>
          <h4 className={styles.h4}>
            {loading ? <Skeleton width={60}  baseColor="var(--loading-color)"/> : `$${price}`}
          </h4>
          <div className={styles.icon_div}>
            {loading ? (
              <Skeleton circle width={24} height={24} baseColor="var(--loading-color)"/>
            ) : (
                <Love className={styles.icon} onClick={love} />)}
            {loading ? (
              <Skeleton circle width={24} height={24} baseColor="var(--loading-color)"/>
            ) : (
                <Car className={styles.icon} onClick={buyGoods} />
            )}
                            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Storecard