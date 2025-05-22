import React, { useState } from 'react'
import styles from './Theme.module.css';
import ThemeCard from '../ThemeCard/ThemeCard';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../redux/modelSlice';
import { saveUserTheme } from '../../api/firestore/userService';

const Theme = () => {
    const dispatch=useDispatch();
    const user=useSelector((state)=>(state.auth.user))

    const [selectedTheme, setSelectedTheme] = useState(null);
  

    const handleThemeSelect = (theme) => {
        dispatch(setTheme(theme));        // 即時改主題
        setSelectedTheme(theme);          // 暫存選擇
    };

    const handleSave = async () => {
        if (!user || !selectedTheme) return;
        await saveUserTheme(user.uid, selectedTheme);
        alert('主題已儲存！');
      };

  return (
    <div className={styles.bg} >
        {/* <h2 className={styles.h2}>外觀設定</h2> */}
        <div className={styles.theme}>
            <h3 className={styles.h3}>主題</h3>
            <div className={styles.theme_item}>
                <ThemeCard apColor={"#e2e5e4"} supColor={"#576E61"} onSelect={handleThemeSelect}
                adColor={"#87a194"} topColor={"#e8eae9"} themeName={"預設"}/>

                <ThemeCard apColor={"#2D2E2D"} supColor={"#3D4341"} onSelect={handleThemeSelect}
                adColor={"#7e8f86"} topColor={"#414241"} themeName={"dark"}/>

                <ThemeCard apColor={"#dee6ea"} supColor={"#5a7d8a"} onSelect={handleThemeSelect}
                adColor={"#89aab5"} topColor={"#e8eef0"} themeName={"冰川藍"}/>

                <ThemeCard apColor={"#f2ebea"} supColor={"#9e5e63"} onSelect={handleThemeSelect}
                adColor={"#c98c90"} topColor={"#f7f3f2"} themeName={"玫瑰粉"}/>
                
                <ThemeCard apColor={"#f1ebe5"} supColor={"#8c6f5b"} onSelect={handleThemeSelect}
                adColor={"#b69d89"} topColor={"#f8f3ee"} themeName={"摩卡奶茶"}/>
                
                <ThemeCard apColor={"#ede7e2"} supColor={"#6a5546"} onSelect={handleThemeSelect}
                adColor={"#a28879"} topColor={"#f5f1ed"} themeName={"焦糖拿鐵"}/>

                <ThemeCard apColor={"#e7eae3"} supColor={"#5c6b4f"} onSelect={handleThemeSelect}
                adColor={"#b7c2a6"} topColor={"#f2f4f0"} themeName={"遞出橄欖枝"}/>

                <ThemeCard apColor={"#f0f3f1"} supColor={"#47624F"} onSelect={handleThemeSelect}
                adColor={"#aabfb0"} topColor={"#f5f8f6"} themeName={"聖誕樹綠"}/>

                <ThemeCard apColor={"#e7dcbe"} supColor={"#7d3d2b"} onSelect={handleThemeSelect}
                adColor={"#b79d58"} topColor={"#f3e8cd"} themeName={"昭和懷舊"}/>

                <ThemeCard apColor={"#f5f4f0"} supColor={"#92b29f"} onSelect={handleThemeSelect}
                adColor={"#f2cfd6"} topColor={"#f8f6f2"} themeName={"花見糰子"}/>

                <ThemeCard apColor={"#fcecee"} supColor={"#e68795"} onSelect={handleThemeSelect}
                adColor={"#9ec89e"} topColor={"#fff7f8"} themeName={"派大星"}/>

                <ThemeCard apColor={"#f0f1f3"} supColor={"#78849b"} onSelect={handleThemeSelect}
                adColor={"#a9a9ab"} topColor={"#fafafa"} themeName={"北歐風"}/>

                <ThemeCard apColor={"#ece9f1"} supColor={"#7b6d85"} onSelect={handleThemeSelect}
                adColor={"#a3b59e"} topColor={"#f3f0f7"} themeName={"薰衣草"}/>

                <ThemeCard apColor={"#f6f6fa"} supColor={"#c9d9e6"} onSelect={handleThemeSelect}
                adColor={"#ffcfdc"} topColor={"#e7f0f7"} themeName={"夢幻樂園"}/>

                <ThemeCard apColor={"#e2e6e8"} supColor={"#4c6b82"} onSelect={handleThemeSelect}
                adColor={"#8daab8"} topColor={"#ecf0f2"} themeName={"紅綠色盲"}/>

                <ThemeCard apColor={"#f5f5f5"} supColor={"#005f73"} onSelect={handleThemeSelect}
                adColor={"#94d2bd"} topColor={"#e9d8a6"} themeName={"藍黃色盲"}/>

                <ThemeCard apColor={"#ffffff"} supColor={"#000000"} onSelect={handleThemeSelect}
                adColor={"#d3d3d3"} topColor={"#f0f0f0"} themeName={"全色盲"}/>

                <ThemeCard apColor={"#f2f2f2"} supColor={"#d42a2a"} onSelect={handleThemeSelect}
                adColor={"#2a4bdd"} topColor={"#ffe600"} themeName={"蒙德里安"}/>

                <ThemeCard apColor={"#fff800"} supColor={"#ff0000"} onSelect={handleThemeSelect}
                adColor={"#00aaff"} topColor={"#00ff44"} themeName={"華國美學"}/>

                <ThemeCard apColor={"#fefefe"} supColor={"#f7f7f7"} onSelect={handleThemeSelect}
                adColor={"#f3f3f3"} topColor={"#fcfcfc"} themeName={"留白"}/>

                <ThemeCard apColor={"#0e0f11"} supColor={"#39ff14"} onSelect={handleThemeSelect}
                adColor={"#ff4f87"} topColor={"#1c1c22"} themeName={"熬夜派大星"}/>
            </div>
            {selectedTheme && (
                <div className={styles.btn_box}>
                    <button  onClick={handleSave} className={styles.yes}>
                        儲存主題：{selectedTheme}
                    </button>
                </div>

            )}
        </div>
    </div>
  )
}

export default Theme