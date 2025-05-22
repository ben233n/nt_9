import React, { useState, useEffect } from 'react';
// 載入 CSS 模組樣式
import styles from './MyData.module.css';

// 載入 Ant Design 表單相關元件
import { Form, Input, Button, DatePicker, Select, Avatar, Typography, Radio, ConfigProvider, Upload, Spin, Skeleton } from 'antd'; // ✅ 新增 Skeleton
// 上傳圖示
import { UploadOutlined } from '@ant-design/icons';
// 從 Redux 取得目前登入的使用者資訊
import { useSelector } from 'react-redux';
// 從 Firebase Firestore 載入方法
import { doc, getDoc, setDoc } from 'firebase/firestore';
// 載入 Firebase 設定檔（Firestore / Storage）
import { db, storage } from '../../api/firebaseConfig';
// 上傳與取得圖片 URL 的方法
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// 載入日期工具套件
import dayjs from 'dayjs';
import { ClipLoader } from 'react-spinners';

const { Option } = Select;
const { Link } = Typography;

const MyData = () => {
  // 從 Redux 取得當前使用者 uid、email
  const user = useSelector((state) => state.auth.user);

  // 控制大頭貼轉圈圈
  const [uploading, setUploading] = useState(false);

  // 控制圖片加載中狀態
  const [imageLoading, setImageLoading] = useState(true);
  
  const [loading, setLoading] = useState(true); // ✅ 控制整體骨架屏顯示
  // 表單控制
  const [form] = Form.useForm();

  // 頭像 URL 狀態（可做預覽）
  const [avatarUrl, setAvatarUrl] = useState(null);

  // 🔒 頭像檔案暫存
  const [file, setFile] = useState(null);

  // 載入 Firestore 內的會員個人資料
  useEffect(() => {
    if (user?.uid) {
      const fetchData = async () => {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            form.setFieldsValue({
              displayName: data.displayName || '',
              phone: data.phone || '',
              gender: data.gender || '',
              birthday: data.birthday ? dayjs(data.birthday) : null,
              address: data.address || '', // ✅ 加上這行
            });
            // 設定圖片 URL 並啟動 loading 狀態
            if (data.avatarUrl) {
              setAvatarUrl(data.avatarUrl);
              setImageLoading(true);
            } else {
              setImageLoading(false);
            }
          } else {
            setImageLoading(false);
          }
        } catch (error) {
          console.error('取得個人資料失敗:', error);
          setImageLoading(false);
        } finally {
          setLoading(false); // ✅ 關閉骨架屏
        }
      };
      fetchData();
    }
  }, [user, form]);

  // 當圖片載入完成後關閉 loading
  const handleImageLoaded = () => {
    setImageLoading(false);
  };

  // 表單提交
  const onFinish = async (values) => {
    try {
      // ✅ 真正上傳圖片（只有當使用者點「儲存資料」時）
      if (file) {
        setUploading(true);
        const storageRef = ref(storage, `avatars/${user.uid}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setAvatarUrl(url);
        values.avatarUrl = url;
      }

      await setDoc(
        doc(db, 'users', user.uid),
        {
          displayName: values.displayName,
          phone: values.phone,
          gender: values.gender,
          birthday: values.birthday ? values.birthday.format('YYYY-MM-DD') : '',
          avatarUrl: values.avatarUrl || avatarUrl || '',
          address: values.address || '', // ✅ 加上這行
        },
        { merge: true }
      );

      alert('資料與圖片上傳成功！'); // ✅ 合併圖片與資料成功提示
    } catch (error) {
      alert('儲存資料失敗'); // ✅ 修改自 message.error
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.bg}>

      {/* ✅ 加入骨架屏包裹表單內容 */}
      {loading ? (
        <Skeleton
          active
          avatar={{ size: 1 }}
          paragraph={{ rows: 8 }}
          className={styles.skeleton}
        />
      ) : (
        <Form form={form} layout="vertical" onFinish={onFinish} className={styles.data}>
          <div className={styles.head_box}>
            {/* 顯示使用者大頭貼與暱稱 */}
            <div className={styles.head_and_name}>
              {uploading || avatarUrl === null ? (
                <div className={styles.head_loading} >
                  <ClipLoader color="var(--text-ttitle-color)" size={40} />
                </div>
              ) : (
                <Avatar className={styles.head} src={avatarUrl} onLoad={handleImageLoaded} />
              )}
            </div>
            
            {/* 上傳頭像欄位 */}
            <Form.Item   className={styles.upload}>
              <p className={styles.mb}>上傳檔案最大2MB</p>
              <Upload
                className={styles.btn_box_box}
                beforeUpload={async (file) => {
                  const isLt2M = file.size / 1024 / 1024 < 2;
                  if (!isLt2M) {
                    alert('圖片大小不能超過 2MB'); // ✅ 圖片大小限制提示
                    return false;
                  }
                
                  try {
                    setUploading(true);
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setAvatarUrl(reader.result);
                    };
                    reader.readAsDataURL(file);
                    setFile(file);
                  } catch (error) {
                    alert('圖片預覽失敗');
                  } finally {
                    setUploading(false);
                  }
                
                  return false;
                }}
                showUploadList={false}
              >
                <ConfigProvider
                  className={styles.btn_box}
                  theme={{
                    components: {
                      Button: {
                        colorPrimary: 'var(--bg-small-color)',
                        colorPrimaryHover: 'var(--on-bang-color)', // 滑鼠碰到的顏色
                        colorPrimaryActive: 'var(--on-bang-color)', // 點下去的顏色
                      },
                    },
                  }}
                >
                  <Button type="primary"  className={styles.btn_box} icon={<UploadOutlined />}>
                    選擇圖片
                  </Button>

                </ConfigProvider>
              </Upload>
            </Form.Item>
          </div>

          <div className={styles.form}>
            <Form.Item
              label={<span style={{ fontSize: 'var(--size-xs)', fontWeight: 500, color: 'var(--text-header-color)' }}>暱稱</span>}
              name="displayName"
              rules={[
                { required: true, message: '請輸入暱稱' },
                { max: 10, message: '暱稱不能超過 10 個字' },
              ]}
            >
              <Input placeholder="輸入你的暱稱" className={styles.input} />
            </Form.Item>

            <Form.Item label={<span style={{ fontSize: 'var(--size-xs)', fontWeight: 500, color: 'var(--text-header-color)' }}>電子郵件</span>}>
              <Input value={user?.email || ''} disabled className={styles.input} />
            </Form.Item>

            <Form.Item
              label={<span style={{ fontSize: 'var(--size-xs)', fontWeight: 500, color: 'var(--text-header-color)' }}>手機號碼</span>}
              name="phone"
              rules={[
                { required: true, message: '請輸入手機號碼' },
                {
                  pattern: /^09\d{8}$/,
                  message: '手機號碼格式錯誤，必須是 09 開頭共 10 碼',
                },
              ]}
            >
              <Input placeholder="輸入你的手機號碼" className={styles.input} />
            </Form.Item>

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
                label={<span style={{ fontSize: 'var(--size-xs)', fontWeight: 500, color: 'var(--text-header-color)' }}>性別</span>}
                name="gender"
                rules={[{ required: true, message: '請選擇性別' }]}
              >
                <Radio.Group>
                  <Radio value="male">男</Radio>
                  <Radio value="female">女</Radio>
                  <Radio value="other">其他</Radio>
                </Radio.Group>
              </Form.Item>
            </ConfigProvider>

            <Form.Item
              label={<span style={{ fontSize: 'var(--size-xs)', fontWeight: 500, color: 'var(--text-header-color)' }}>生日</span>}
              name="birthday"
              rules={[{ required: true, message: '請選擇生日' }]}
            >
              <DatePicker style={{ width: '100%' }} className={styles.input} />
            </Form.Item>

            <Form.Item
              label={
                <span style={{ fontSize: 'var(--size-xs)', fontWeight: 500, color: 'var(--text-header-color)' }}>
                  地址
                </span>
              }
              name="address"
              rules={[
                { required: true, message: '請輸入地址' },
                { max: 100, message: '地址長度不能超過 100 個字' },
                {
                  pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9\s#\-]+$/,
                  message: '地址格式錯誤，請勿輸入特殊符號'
                }
              ]}
            >
              <Input placeholder="請輸入你的地址" className={styles.input} />
            </Form.Item>
            <Form.Item label={<span style={{ fontSize: 'var(--size-xs)', fontWeight: 500, color: 'var(--text-header-color)' }}>密碼</span>}>
              <Link href="/reset-password">設定新密碼</Link>
            </Form.Item>

            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimaryHover: 'var(--on-bang-color)',
                    colorPrimaryActive: 'var(--on-bang-color)',
                  },
                },
              }}
            >
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  className={styles.ok}
                >

                {uploading || avatarUrl === null ? (
                    <ClipLoader color="var(--text-block-color)" size={18} />
                ) : (
                  <p>儲存資料</p>
                )}
                </Button>
              </Form.Item>
            </ConfigProvider>
          </div>
        </Form>
      )}
    </div>
  );
};

export default MyData;