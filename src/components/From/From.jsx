import {LockOutlined,UserOutlined,MailOutlined,} from '@ant-design/icons';
import {LoginForm,ProFormText,ProFormCheckbox,ProFormDatePicker,} from '@ant-design/pro-components';
import { Tabs } from 'antd';
import { useState ,useRef} from 'react';
import styles from './From.module.css'; // 你的 CSS Modules
import Grass from '../Grass/Grass';
import { motion } from 'framer-motion'; // ✅ 修正
import { doc, getDoc, setDoc } from 'firebase/firestore'; // ✅ 匯入 Firestore 方法
import { FadeInOne } from '../Anime';
import { auth,db } from '../../api/firebaseConfig'; // 根據你的路徑調整
import { setTheme } from '../../redux/modelSlice';
import { getFavorites } from '../../api/firestore/favoriteService';
import { setFavorites } from '../../redux/favoriteSlice';
import { useLocation, useNavigate } from 'react-router';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';


const From = ({onLoginSuccess}) => {
  const location = useLocation(); // ⬅️ 抓網址列資訊
  const navigate = useNavigate(); // ⬅️ 用來跳轉
  const dispatch = useDispatch();
  const formRef = useRef(); // ✅ 修正：formRef 記得初始化
  
  const [loginType, setLoginType] = useState('account');
  const [showStep2, setShowStep2] = useState(false);
  const [registerEmail, setRegisterEmail] = useState('');
  
  return (
    <motion.div className={styles.bg} {...FadeInOne}>

        <Grass/>
        <LoginForm
            formRef={formRef}
            onFinish={async (values) => {
              if (loginType === 'register' && !showStep2) {
                setShowStep2(true);
                return;
              }
            
              if (loginType === 'register' && showStep2) {
                // ✅ 註冊流程
                try {
                  const email = registerEmail;
                  const { password, username } = values;
            
                  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

                   // ✅ 新增：將使用者資料存進 Firestore
                  const userData = {
                    displayName: username,
                    avatarUrl:"https://res.cloudinary.com/daimwhvru/image/upload/v1748076311/%E6%9C%AA%E5%91%BD%E5%90%8D%E8%A8%AD%E8%A8%88_1_xhzdjj.jpg"
                  };
                  await setDoc(doc(db, 'users', userCredential.user.uid), userData);

            
                  await updateProfile(userCredential.user, {
                    displayName: username,
                  });
            
                  alert('註冊成功');
                  return;
                } catch (error) {
                  if (error.code === 'auth/email-already-in-use') {
                    alert('這個 Email 已經被註冊過了！');
                  } else if (error.code === 'auth/invalid-email') {
                    alert('Email 格式錯誤，請重新輸入。');
                  } else if (error.code === 'auth/weak-password') {
                    alert('密碼強度不足，請設定一個更強的密碼。');
                  } else {
                    console.error(error);
                    alert('註冊失敗，請稍後再試！');
                  }
                  return; // 無論成功或失敗都 return
                }
              }
            
              if (loginType === 'account') {
                // ✅ 登入流程
                try {
                  const { email, password } = values;
            
                  await signInWithEmailAndPassword(auth, email, password);
            
                  alert('登入成功');
            
                  const userInfo = {
                    uid: auth.currentUser.uid,
                    email: auth.currentUser.email,
                    displayName: auth.currentUser.displayName,
                  };
            
                  dispatch(setUser(userInfo));
            
                  // 抓取 Firestore 的主題資料
                  const themeDocRef = doc(db, 'users', userInfo.uid);
                  const themeSnapshot = await getDoc(themeDocRef);

                  // const favorites = await getFavorites(userInfo.uid);
                  // dispatch(setFavorites(favorites)); // ⬅️ 存進 Redux
            
                  if (themeSnapshot.exists()) {
                    const docData = themeSnapshot.data();
                    if (docData.theme) {
                      dispatch(setTheme(docData.theme));
                    }
                  }
            
                  // 執行登入成功的 callback
                  // 嘗試從 URL 取得 redirect 參數，沒有就預設跳首頁
                  const searchParams = new URLSearchParams(location.search);
                  const redirectTo = searchParams.get('redirect') || '/myuser';

                  // 導向原本想前往的頁面
                  navigate(redirectTo);
            
                  return;
                } catch (error) {

                    console.error(error);
                    alert('帳號或密碼錯誤');
                  
                  return;
                }
              }
            }}
            submitter={{
                render: (_, dom) => (
                  <div style={{ textAlign: 'center' }}>
                    <button
                      type="submit"
                      className={styles.btn}
                    >
                      {loginType === 'register' && showStep2 ? '註冊' : loginType === 'register' ? '下一步' : '登入'}
                    </button>
                  </div>
                ),
              }}
        >
            <Tabs className={styles.Tabs} centered activeKey={loginType} onChange={(key) => {
              setLoginType(key);
              setShowStep2(false);
            
            }} >
              <Tabs.TabPane key="account" tab="登入" />
              <Tabs.TabPane key="register" tab="註冊" />
            </Tabs>
          
            {/* 登入畫面 */}
            {loginType === 'account' && (
              <>
                <ProFormText
                  name="email"
                  fieldProps={{
                    size: 'large',
                    prefix: <MailOutlined className={styles.prefixIcon} />,
                    className: styles.input,
                  }}
                  placeholder="請輸入 Email"
                  rules={[
                    { required: true, message: '請輸入 Email!' },
                    { type: 'email', message: 'Email 格式不正確！' },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                    className: styles.input,
                  }}
                  placeholder="請輸入密碼"
                  rules={[{ required: true, message: '請輸入密碼！' }]}
                />

                {/* 忘記密碼連結 */}
                <div className={styles.forgotPassword}>
                  <a href="/forgot-password" className={styles.forgotPassword}>忘記密碼？</a>
                </div>
              </>
            )}

            {/* 註冊步驟一 */}
            {loginType === 'register' && !showStep2 && (
            <>
              <ProFormText
                name="email"
                fieldProps={{  onChange: (e) => setRegisterEmail(e.target.value),size: 'large', prefix: <MailOutlined className={styles.prefixIcon} /> ,className: styles.input}}
                placeholder="請輸入 Email"
                rules={[{ required: true, message: '請輸入 Email!' },
                    { type: 'email', message: 'Email 格式不正確！' }, // 驗證格式
                ]
                }
              />
                <ProFormCheckbox
                  name="loginAgreement"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(new Error('請勾選同意服務條款！')),
                    },
                  ]}
                  className={styles.agreementCheckbox}
                >
                  <span className={styles.agreementText}>
                    我同意網站的 <a href="/terms">服務條款</a> 及 <a href="/privacy">隱私權政策</a>
                  </span>
                </ProFormCheckbox>
            </>
          )}

          {/* 註冊步驟二 */}
          {loginType === 'register' && showStep2 && (
            <>
              <ProFormText
                name="username"
                fieldProps={{ size: 'large', prefix: <UserOutlined className={styles.prefixIcon}  /> ,className: styles.input}}
                placeholder="請輸入用戶名"
                rules={[{ required: true, message: '請輸入用戶名!' }]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{ size: 'large', prefix: <LockOutlined className={styles.prefixIcon}  /> ,className: styles.input ,onChange: () => {
                    formRef.current?.validateFields(['confirmPassword']);
                  },}}
                placeholder="請輸入密碼"
                rules={[
                    { required: true, message: '請輸入密碼！' },
                    {
                      pattern: /^(?=.*[A-Za-z]).{9,}$/,
                      message: '密碼需至少9位，且包含至少一個英文字母！',
                    },
                  ]}
              />
              <ProFormText.Password
                name="confirmPassword"
                fieldProps={{ size: 'large', prefix: <LockOutlined className={styles.prefixIcon}  /> ,className: styles.input}}
                placeholder="再次輸入密碼"
                dependencies={['password']} // 👈 告訴表單這欄會依賴 password
                rules={[
                    { required: true, message: '請再次輸入密碼！' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('兩次輸入的密碼不一致！'));
                      },
                    }),
                  ]}
              />

            </>
          )}
        </LoginForm>
    </motion.div>
  );
}

export default From