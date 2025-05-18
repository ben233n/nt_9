import React from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../../api/firebaseConfig';
import { clearUser } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';
import { setTheme } from '../../redux/modelSlice';

const Out = ({ className }) => {
    const dispatch=useDispatch();

    const gameOut=()=>{
        try{
            dispatch(clearUser()); // 清除登入狀態
            dispatch(setTheme('light')); // 還原成預設主題（例如 light）
            localStorage.removeItem('user'); // 清除使用者資訊
            alert('已成功登出');
        }catch(error){
            alert('登出失敗，請稍後再試');
        }
        
    }
    
    return (
      <div onClick={gameOut} className={className}>登出</div>
    )
}

export default Out