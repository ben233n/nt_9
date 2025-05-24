import React from 'react';
import styles from './MyLove.module.css';
import Storecard from '../Storecard/Storecard';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { fetchStores } from '../../api/firestore/fetchStores';


const MyLove = () => {
    const favorites = useSelector((state) => state.favorites.items); // ✅ 注意名稱要一致
    const { data: storeData, isLoading, isError } = useQuery({
      queryKey: ['stores'],
      queryFn: fetchStores
    });
  
    const lovedItems = (storeData || []).filter(item => favorites.includes(item.id));


  return (
    <div className={styles.bg}>
        <h3 className={styles.h3}>我的收藏</h3>
        <div className={styles.card_div}>
          {lovedItems?.length > 0 ? (
            lovedItems?.map((goodsitem) => (
                <Storecard key={goodsitem.id} loading={isLoading} isone={false} itemid={goodsitem.id} name={goodsitem.name} price={goodsitem.price} image={goodsitem.image}/>
            ))
          ) : (
            <p className={styles.empty}>尚未收藏任何商品</p>
          )}
        </div>
    </div>
    
  );
};

export default MyLove;