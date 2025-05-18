import React from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../../api/firebaseConfig';
import { clearUser } from '../../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../redux/modelSlice';

const Out = ({ className }) => {
    const dispatch=useDispatch();


    const gameOut = async () => {
        try {
          await signOut(auth); // ✅ 這是關鍵步驟：讓 Firebase 知道你要登出
      
          dispatch(clearUser()); // 清除 Redux 狀態
          dispatch(setTheme('light')); // 還原主題（選用）
          localStorage.removeItem('user'); // 如果你有自己儲存使用者資料才需要這行
      
          alert('已成功登出');
        } catch (error) {
          console.error('登出錯誤：', error);
          alert('登出失敗，請稍後再試');
        }
      };
    
    return (
      <div onClick={gameOut} className={className}>登出</div>
    )
}

export default Out