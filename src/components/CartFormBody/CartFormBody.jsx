import React, { useEffect, useState } from 'react'
import styles from './CartFormBody.module.css';

import Cartcard from '../Cartcard/Cartcard'
import { useSelector } from 'react-redux';
import { useMediaQuery } from "react-responsive";
import { AnimatePresence, motion } from "motion/react"
import { DownLook, FadeIn, FadeInOne } from '../Anime';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setCheckoutItems, setTotal } from '../../redux/checkoutSlice';

import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../api/firebaseConfig';
import { Form, Input, Select, Radio, Checkbox, ConfigProvider } from 'antd';
import {setCustomerInfo} from '../../redux/checkoutSlice'
import { showToast } from '../../redux/toastSlice';

const CartFormBody = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(state => state.cart.cartItems);
  const checkoutItems = useSelector(state => state.checkout.items);
  const total = useSelector(state => state.checkout.total);
  const shippingFee = useSelector(state => state.checkout.shippingFee);

  const [showModal, setShowModal] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 992 });

  const user = useSelector(state => state.auth.user);
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    phone: '',
    address: '',
    
  });

  const [form] = Form.useForm(); // 建立 Ant Design 的 form 實例

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.uid) return;

      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const mergedData = {
            displayName: data.displayName || '',
            email: user.email || '',
            phone: data.phone || '',
            fullAddress: data.address || '', // 對應表單的欄位名稱
          };
          setFormData(mergedData);
          form.setFieldsValue(mergedData); // ⭐ 將資料填入表單
        }
      } catch (err) {
        console.error("抓取使用者資料失敗：", err);
      }
    };

    fetchUserData();
  }, [user, form]); // form 要放在依賴中，確保能更新


  useEffect(() => {
    // 如果 checkoutItems 是空的但 cart 還有資料，就自動補上
    if (checkoutItems.length === 0 && cartItems.length > 0) {
      dispatch(setCheckoutItems(cartItems));
      const total = cartItems.reduce((sum, item) => sum + item.price * item.num, 0);
      dispatch(setTotal(total + 1200));
    }
  }, [checkoutItems, cartItems, dispatch]);

  const handleFinish = (values) => {
    // 補上 note 欄位的預設值（如果為 undefined 或空字串，就設為 "無"）
    const fixedValues = {
      ...values,
      note: values.note || "無",
    };
  
    console.log('✅ 表單驗證成功，資料如下：', fixedValues);
    dispatch(setCustomerInfo(fixedValues));
    navigate('/cart/step3');
  };
  



  return (
    <div className={styles.bg}>
        <div className={`${styles.container} container `}>
            <div className={styles.left}>
                <h3 className={styles.h3}>顧客資料</h3>

                    <div className={styles.card_div}>
                    <Form
                      layout="vertical"
                      form={form}
                      initialValues={formData}
                      onValuesChange={(changed, all) => setFormData(all)}
                      onFinish={handleFinish} // 新增這行
                      requiredMark={false}
                      onFinishFailed={() => {
                        dispatch(showToast("⚠️ 有資料未填寫"));
                      }} // 表單驗證失敗時執行
                    >
                          {/* ↓↓↓ 以下表單內容不變，保留原始樣式與邏輯 ↓↓↓ */}
                          <div className={styles.formSection}>
                            <Form.Item
                              label={<span style={{ fontSize: 'var(--size-xs)', fontWeight: 500, color: 'var(--text-header-color)' }}>姓名</span>}
                              name="displayName"
                              rules={[{ required: true, message: '請輸入姓名' }]}
                            >
                              <Input placeholder="請輸入姓名" className={styles.input} />
                            </Form.Item>
            
                            <div className={styles.fieldGroup}>
                              <Form.Item
                                label={<span style={{ fontSize: 'var(--size-xs)', fontWeight: 500, color: 'var(--text-header-color)' }}>手機號碼</span>}
                                name="phone"
                                className={styles.halfWidth}
                                rules={[{ required: true, message: '請輸入手機號碼' }]}
                              >
                                <Input placeholder="請輸入手機號碼" className={styles.input} />
                              </Form.Item>
            
                              <Form.Item
                                label={<span style={{ fontSize: 'var(--size-xs)', fontWeight: 500, color: 'var(--text-header-color)' }}>電子郵件</span>}
                                name="email"
                                
                                className={styles.halfWidth}
                                rules={[
                                    { required: true, message: '請輸入 Email' },
                                    { type: 'email', message: '請輸入正確的 Email 格式' },
                                  ]}
                              >
                                <Input placeholder="請輸入 Email" className={styles.input} />
                              </Form.Item>
                            </div>
                          </div>
            
                          {/* 地址欄位，名稱要改為 fullAddress 才能與上方資料對應 */}
                          <div className={styles.formSection}>
                            <Form.Item
                              label={<span style={{ fontSize: 'var(--size-xs)', fontWeight: 500, color: 'var(--text-header-color)' }}>地址</span>}
                              name="fullAddress"
                              rules={[{ required: true, message: '請輸入完整地址' }]}
                            >
                              <Input placeholder="請輸入完整地址，例如：台北市信義區松壽路9號110" className={styles.input} />
                            </Form.Item>
                          </div>

                          {/* 配送方式 */}
                          <div className={styles.formSection}>
                          <ConfigProvider
                              theme={{
                                components: {
                                  Radio: {
                                    colorPrimary: 'var(--text-ttitle-color)',
                                    colorBorder: 'var(--text-p-color)',
                                    colorBgContainer: 'var(--bg-shop-color)',
                                    borderRadius: 4,
                                    fontSize: 'var(--size-xs)',
                                    colorText: 'var(--text-p-color)',
                                    fontWeight: 600,
                                  },
                                },
                              }}
                            >
                              <Form.Item
                                label={<span style={{ fontSize: 'var(--size-xs)', fontWeight: 500, color: 'var(--text-header-color)' }}>配送方式</span>}
                                name="shippingMethod"
                                initialValue="黑貓宅配"
                                rules={[{ required: true }]}
                              >
                                <Radio.Group className={styles.radioGroup}>
                                  <Radio value="黑貓宅配">黑貓宅配（預設）</Radio>
                                  <Radio value="7-11">7-11 超商取貨</Radio>
                                  <Radio value="全家">全家超商取貨</Radio>
                                  <Radio value="宅配到府">宅配到府</Radio>
                                </Radio.Group>
                              </Form.Item>
                            </ConfigProvider>

                            <ConfigProvider
                              theme={{
                                token: {
                                  colorPrimary: 'var(--text-p-color)',          // 主色（hover/選中）
                                  colorPrimaryBorder: 'var(--text-p-color)',   // 邊框主色（可相同）
                                  colorBorder: 'var(--text-p-color)',                 // 預設邊框色
                                  controlOutline: 'rgba(110, 131, 112, 0.2)',        // 聚焦時的外框光暈
                                },
                                components: {
                                  Select: {
                                    colorBgContainer: 'var(--bg-shop-color)',         // 背景色
                                    colorBorder: 'var(--text-p-color)',               // 邊框色
                                    colorText: 'var(--text-header-color)',            // 文字色
                                    fontSize: 14,                                     // 字體大小
                                    fontWeightStrong: 400,                            // 字重
                                    borderRadius: 8,                                  // 圓角
                                    controlPaddingHorizontal: 16,                     // 左右 padding
                                    controlHeight: 44,                                // 高度
                                    optionSelectedBg: 'var(--plan-color)',        // 選中項背景色
                                    optionActiveBg: 'var(--plan-color)',          // hover 時項目背景色
                                  },
                                },
                              }}
                            >
                              <Form.Item
                                label={
                                  <span
                                    style={{
                                      fontSize: 'var(--size-xs)',
                                      fontWeight: 500,
                                      color: 'var(--text-header-color)',
                                    }}
                                  >
                                    指定時段（選填）
                                  </span>
                                }
                                name="timeSlot"
                                initialValue="不指定"
                              >
                                <Select placeholder="請選擇時段（可不填）">
                                  <Select.Option value="不指定">不指定</Select.Option>
                                  <Select.Option value="早上">早上</Select.Option>
                                  <Select.Option value="下午">下午</Select.Option>
                                </Select>
                              </Form.Item>
                            </ConfigProvider>
                          </div>

                          {/* 發票資訊 */}
                          <div className={styles.formSection}>
                          <ConfigProvider
                              theme={{
                                components: {
                                  Radio: {
                                    colorPrimary: 'var(--text-ttitle-color)',
                                    colorBorder: 'var(--text-p-color)',
                                    colorBgContainer: 'var(--bg-shop-color)',
                                    borderRadius: 4,
                                    fontSize: 'var(--size-xs)',
                                    colorText: 'var(--text-p-color)',
                                    fontWeight: 600,
                                  },
                                },
                              }}
                            >
                              <Form.Item
                                label={<span style={{ fontSize: 'var(--size-xs)', fontWeight: 500, color: 'var(--text-header-color)' }}>發票資訊</span>}
                                name="invoiceType"
                                initialValue="個人"
                                rules={[{ required: true, message: '請選擇發票類型' }]} // ← 加這行
                              >
                                <Radio.Group className={styles.radioGroup}>
                                  <Radio value="個人">二聯式發票（個人）</Radio>
                                  <Radio value="公司">三聯式發票（公司）</Radio>
                                  <Radio value="捐贈">捐贈發票</Radio>
                                  <Radio value="手機條碼">手機條碼載具</Radio>
                                </Radio.Group>
                              </Form.Item>
                            </ConfigProvider>

                            <Form.Item noStyle shouldUpdate={(prev, cur) => prev.invoiceType !== cur.invoiceType}>
                              {({ getFieldValue }) => {
                                const type = getFieldValue('invoiceType');
                                if (type === '公司') {
                                  return (
                                    <>
                                      <Form.Item
                                        label={<span style={{ fontSize: 'var(--size-xs)', fontWeight: 500, color: 'var(--text-header-color)' }}>公司名稱</span>}
                                        name="companyName"
                                        rules={[{ required: true, message: '請輸入公司名稱' }]}
                                      >
                                        <Input className={styles.input} />
                                      </Form.Item>
                                      <Form.Item
                                        label={<span style={{ fontSize: 'var(--size-xs)', fontWeight: 500, color: 'var(--text-header-color)' }}>統編</span>}
                                        name="taxId"
                                        rules={[{ required: true, message: '請輸入統編' }]}
                                      >
                                        <Input className={styles.input} />
                                      </Form.Item>
                                    </>
                                  );
                                }
                                if (type === '捐贈') {
                                  return (
                                    <Form.Item
                                      label={<span style={{ fontSize: 'var(--size-xs)', fontWeight: 500, color: 'var(--text-header-color)' }}>愛心碼</span>}
                                      name="donateCode"
                                      rules={[{ required: true, message: '請輸入愛心碼' }]}
                                    >
                                      <Input className={styles.input} />
                                    </Form.Item>
                                  );
                                }
                                return null;
                              }}
                            </Form.Item>
                          </div>
                          
                          {/* 備註欄 */}
                          <div className={styles.formSection}>
                            <Form.Item
                              label={<span style={{ fontSize: 'var(--size-xs)', fontWeight: 500, color: 'var(--text-header-color)' }}>備註 (選填)</span>}
                              name="note"
                              initialValue="無"
                            >
                              <Input.TextArea rows={3} placeholder="交貨說明、司機聯絡方式等" className={styles.input} />
                            </Form.Item>
                          </div>
                        </Form>
                    </div>
              </div>
              <div className={styles.right}>
                  <h3 className={styles.h3}>訂單資訊</h3>
                  <div className={styles.details}>
                    <div className={styles.one_money_info}>
                      <p className={styles.p}>商品金額</p>
                      <p className={styles.p}>{total - shippingFee}</p>
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
                  <button className={styles.buy} onClick={() => form.submit()}> 送出訂單</button>
              </div>
          </div>  
          { isMobile &&(
            <>
              <motion.div className={styles.air} {...FadeInOne}>
                      <div className={styles.phone_total_info}>
                          <p className={styles.phone_total_p} onClick={()=>setShowModal(true)}>明細</p>
                          <p className={styles.total_h3}>NT${total}</p> 
                      </div>
                      <button className={styles.phone_buy} onClick={() => form.submit()}> 送出訂單</button>
              </motion.div>
            </>
  
          )}
  
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
              className={styles.total_card}
              style={{display:isMobile? 'block':'none'}}
              initial={{ y: "100%" }}
              animate={{ y: showModal ? "0%" : "100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              >
                 <h3 className={styles.h3}>訂單資訊</h3>
                  <div className={styles.details}>
                  <div className={styles.one_money_info}>
                    <p className={styles.p}>商品金額</p>
                    <p className={styles.p}>{total - shippingFee}</p>
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
                <button className={styles.buy} onClick={()=>setShowModal(false)}>關閉</button>
          </motion.div>
      </div>
    )
}

export default CartFormBody