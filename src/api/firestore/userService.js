// 匯入 Firestore 函數
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // 你初始化 Firestore 的檔案

// 儲存主題到 Firestore
export const saveUserTheme = async (uid, theme) => {
  try {
    // 設定使用者資料 doc
    const userRef = doc(db, 'users', uid);
    // 更新或新增 theme 欄位
    await setDoc(userRef, { theme }, { merge: true }); // merge 讓其他欄位不會被覆蓋
  } catch (error) {
    console.error('儲存主題失敗:', error);
  }
};

// 從 Firestore 讀取使用者主題
export const fetchUserTheme = async (uid) => {
  try {
    const userRef = doc(db, 'users', uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      return docSnap.data().theme; // 回傳儲存的主題
    } else {
      return 'light'; // 如果沒資料，預設為 light
    }
  } catch (error) {
    console.error('讀取主題失敗:', error);
    return 'light';
  }
};