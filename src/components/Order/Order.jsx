import React, { useEffect, useState } from 'react';
import styles from './Order.module.css';
import { useSelector } from 'react-redux';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../api/firebaseConfig';
import OrderCard from '../OrderCard/OrderCard';

const Order = () => {
  const user = useSelector((state) => state.auth.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 抓訂單資料
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.uid) {
        setLoading(false);
        return;
      }
  
      try {
        const ordersRef = collection(db, 'users', user.uid, 'orders');
        const snapshot = await getDocs(ordersRef);
  
        const orderList = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds); // ⭐ 按照時間從新到舊排序
  
          setOrders(orderList);
        } catch (error) {
          console.error('抓取訂單失敗:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchOrders();
    }, [user]);
  
    // 處理單筆刪除後更新 orders 狀態
    const handleDelete = (deletedId) => {
      setOrders(prev => prev.filter(order => order.id !== deletedId));
    };
  
    return (
      <div className={styles.bg}>
        {!orders.length > 0 && (
          <div className={styles.block_box}>
            <h3 className={styles.h3}>我的訂單</h3>
            {!loading && <p className={styles.no_item}>尚未有訂單</p>}
          </div>
        )}
        <div className={styles.card_div}>
          {loading ? (
            <div className={styles.block_box}>
              <p className={styles.no_item}>載入中...</p>
            </div>
          ) : orders.length > 0 ? (
            orders.map((order) => (
              <OrderCard
                key={order.id}
                oredrId={order.id}
                createdAt={order.createdAt}
                items={order.items}
                total={order.total}
                onDelete={handleDelete} // ✅ 傳入刪除 callback
              />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  };

export default Order;