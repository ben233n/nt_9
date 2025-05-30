import React from 'react'
import styles from './CartCheckBody.module.css';
import { useDispatch, useSelector } from 'react-redux'; // 👈 抓 Redux 資料
import { AnimatePresence,motion } from "motion/react"
import Cartcard from '../Cartcard/Cartcard'
import Return from "../../assets/svg/return.svg?react";
import Formok from "../../assets/svg/formok.svg?react";
import { useNavigate } from 'react-router';
import { getAuth } from 'firebase/auth';
import { clearCart } from '../../redux/cartSlice'; // 你需要新增這個 reducer
import { db } from '../../api/firebaseConfig';
import { doc, collection, addDoc, serverTimestamp,setDoc } from 'firebase/firestore';
import { resetCheckout } from '../../redux/checkoutSlice';
import { showToast } from '../../redux/toastSlice';
import { Timestamp } from 'firebase/firestore';

const CartCheckBody = () => {
  const navigator=useNavigate();
  const auth = getAuth();
  const dispatch=useDispatch();

  const formData = useSelector(state => state.checkout.formData);
  const total=useSelector(state=>state.checkout.total);
  // const cartitems=useSelector(state=>state.cart.cartItems);
  const shippingFee=useSelector(state=>state.checkout.shippingFee);
  const items = useSelector((state) => state.checkout.items || []);
  console.log('items:', items);
  const {
    displayName,
    phone,
    email,
    fullAddress,
    shippingMethod,
    invoiceType,
    companyName,
    taxId,
    notes
  } = formData;

  const returnStep=()=>{
    navigator("/cart/step2")
  }

  const finish= async ()=>{
    const user=auth.currentUser;
    if (!user) return;

    const uid = user.uid;

    const orderData = {
      createdAt: serverTimestamp(),
      items,
      total,
      shippingFee,
      customerInfo: formData
    };

    try{
      await addDoc(collection(db, 'users', uid, 'orders'), orderData);

        // 🔥 根據方案計算到期日
        const now = new Date();
        const subscriptionEnd = new Date(now);

        subscriptionEnd.setDate(subscriptionEnd.getDate() + 30);

      const subscriptionItem = items.find(item => item.mode === 2);
      if (subscriptionItem) {
        const userRef = doc(db, 'users', uid);
        await setDoc(userRef, {
          subscriptionTier: items[0].name,
          subscriptionActive: true,
          subscriptionSince: serverTimestamp(),
          subscriptionUntil: Timestamp.fromDate(subscriptionEnd)
        }, { merge: true }); // ✅ merge 表示只更新部分欄位，不會覆蓋整份文件
      }
      

      dispatch(clearCart());
      dispatch(resetCheckout());
      dispatch(showToast("✔️ 完成訂單"));
      navigator('/myuser');
      console.log("Finish order items:", items);
      console.log("Finish order formData:", formData);
    }
    catch (error) {
      console.error("Order failed:", error);
      dispatch(showToast("❌ 下單失敗"));;
    }


  }

  return (
    <div className={styles.bg}>
      <div className={`${styles.container} container `}>
        <div className={styles.ap}>
          <h3 className={styles.h3}>訂單確認</h3>
            <div className={styles.one_info}>
              <p className={styles.p}>姓名：{displayName}</p>
              <p className={styles.p}>手機號碼：{phone}</p>
              <p className={styles.p}>電子郵件：{email}</p>
              <p className={styles.p}>地址：{fullAddress}</p>
              <p className={styles.p}>配送方式：{shippingMethod}</p>
              <p className={styles.p}>發票類型：{invoiceType}</p>
              {invoiceType === '公司' && (
                <>
                  <p className={styles.p}>公司名稱：{companyName}</p>
                  <p className={styles.p}>統一編號：{taxId}</p>
                </>
              )}
              {notes && <p className={styles.p}>備註：{notes}</p>}
            </div>
            <div>
            {items.map(item => {
                const uniqueKey = `${item.name}-${item.style}`;

                return (
                  <motion.div
                    key={uniqueKey}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                      <Cartcard
                        idnum={item.goodsid}
                        price={item.price}
                        name={item.name}
                        num={item.num}
                        image={item.image}
                        choose={item.style}
                        mode={item.mode}
                      />
                  </motion.div>
                );
              })
            }
            </div>

            <div>
              <div className={styles.details}>
                <div className={styles.one_money_info}>
                  <p className={styles.p}>商品金額</p>
                  <p className={styles.p}>{total-shippingFee}</p>
                </div>
                <div className={styles.one_money_info}>
                  <p className={styles.p}>估計運費</p>
                  <p className={styles.p}>{shippingFee}</p>
                </div>
              </div>
              <div className={styles.details}>
                <div className={styles.one_money_info}>
                  <p className={styles.p}>商品總額</p>
                  <p className={styles.p}>{total}</p>
                </div>
              </div>
            </div>

            <div className={styles.btn_box}>
              <button className={styles.buy_air} onClick={returnStep}> 
                <Return className={styles.shopicon} />
                <p>回上一步</p>
              </button>

              <button className={styles.buy} onClick={finish}> 
                <Formok className={styles.shopicon} />
                <p>完成訂單</p>
              </button>
            </div>
            
        </div>
      </div>
    </div>
  )
}

export default CartCheckBody