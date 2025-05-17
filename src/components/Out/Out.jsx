import React from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../../api/firebaseConfig';
import { clearUser } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';

const Out = () => {
    const dispatch=useDispatch();

    const gameOut=()=>{
        try{
            dispatch(clearUser());
            alert('已成功登出');
        }catch(error){
            alert('登出失敗，請稍後再試');
        }
        
    }
    
    return (
      <div onClick={gameOut}>Outasdasdasdasdas</div>
    )
}

export default Out