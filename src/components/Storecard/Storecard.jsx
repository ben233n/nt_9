import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './Storecard.module.css';
import Love from '../../assets/svg/love.svg?react';
import Car from '../../assets/svg/itemshopcar.svg?react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'; // ✅ 一起引入 useDispatch 和 useSelector
import { addItems } from '../../redux/cartSlice';
import { showToast } from '../../redux/toastSlice';
import { addFavorite, removeFavorite } from '../../redux/favoriteSlice'; // ✅ 收藏 Redux
import { toggleFavorite } from '../../api/firestore/favoriteService'; // ✅ 收藏 Firestore 功能
import { auth } from '../../api/firebaseConfig';


const Storecard = ({ name, price, image, itemid, isone, loading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const favoriteList = useSelector(state => state.favorites.items); // ✅ [取得收藏清單]
  const user = useSelector(state => state.auth.user); // ✅ [取得當前登入使用者]
  const isFavorite = favoriteList.includes(itemid); // ✅ [判斷是否已收藏]

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
      style:'標準版',
      mode:1,
    };
    dispatch(addItems(item));
    dispatch(showToast("🛒 已加入購物車"));
  }

  const love = async (e) => {
    e.stopPropagation();

    if (!user) {
      dispatch(showToast("⚠️ 請先登入"));
      return;
    }

    try {
      await toggleFavorite(user.uid, itemid, isFavorite); // ✅ [同步 Firebase]
      if (isFavorite) {
        dispatch(removeFavorite(itemid)); // ✅ [Redux 移除收藏]
        dispatch(showToast("💔 已移除收藏"));
      } else {
        dispatch(addFavorite(itemid)); // ✅ [Redux 加入收藏]
        dispatch(showToast("❤️ 已加入收藏"));
      }
    } catch (error) {
      dispatch(showToast("⚠️ 收藏操作失敗"));
      console.error("Toggle favorite failed:", error);
    }
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
                <Love className={isFavorite?styles.loveicon:styles.icon} onClick={love} 

                />)}
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