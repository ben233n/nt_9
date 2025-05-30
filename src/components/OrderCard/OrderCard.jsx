import React, { useState } from 'react';
import styles from './OrderCard.module.css';
import Cartcard from '../Cartcard/Cartcard';
import Downmore from '../../assets/svg/downmore.svg?react';
import Upmore from '../../assets/svg/upmore.svg?react';
import { db } from '../../api/firebaseConfig';
import { doc, deleteDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';

const OrderCard = ({ oredrId, createdAt, items, total, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const user = useSelector(state => state.auth.user);

  const toggleExpanded = () => {
    setExpanded(prev => !prev);
  };

  const handleDelete = async () => {
    if (!user?.uid) return;

    const confirm = window.confirm('確定要刪除這筆訂單嗎？');
    if (!confirm) return;

    try {
      setDeleting(true);
      await deleteDoc(doc(db, 'users', user.uid, 'orders', oredrId));
      onDelete(oredrId); // 通知父層移除
    } catch (error) {
      console.error('刪除失敗：', error);
      alert('刪除失敗，請稍後再試');
    } finally {
      setDeleting(false);
    }
  };

  const displayedItems = expanded ? items : items.slice(0, 1);

  return (
    <div className={styles.bg}>
      <div className={styles.top}>
        <h3 className={styles.h3}>訂單編號：{oredrId}</h3>
        <p className={styles.h3_color}>待出貨</p>
      </div>
      <div className={styles.ap}>
        <p className={styles.p}>
          下單日期：{new Date(createdAt?.seconds * 1000).toLocaleString()}
        </p>
        <p className={styles.p}>總金額：{total}</p>
      </div>

      <div className={styles.ad}>
        {displayedItems.map((item, index) => (
          <Cartcard
            mode={item.mode}
            key={item.id || item.name + item.style} // 假設 item.id 存在最好，沒有就拼接 name+style
            name={item.name}
            image={item.image}
            num={item.num}
            price={item.price}
            choose={item.style}
            
          />
        ))}
        {items.length > 1 && (
          <div className={styles.btn_box} onClick={toggleExpanded}>
            {expanded ? (
              <p className={styles.icon_p}>
                <Upmore className={styles.icon} /> 收起商品
              </p>
            ) : (
              <p className={styles.icon_p}>
                <Downmore className={styles.icon} /> 查看其餘 {items.length - 1} 件商品
              </p>
            )}
          </div>
        )}
      </div>

      {/* 新增刪除按鈕 */}
      <div className={styles.delete_btn_box}>
        <button
          className={styles.delete_btn}
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? '刪除中...' : '刪除訂單'}
        </button>
      </div>
    </div>
  );
};

export default OrderCard;