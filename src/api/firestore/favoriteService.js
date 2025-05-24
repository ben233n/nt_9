// favoriteService.js ✅ 新增檔案
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const toggleFavorite = async (userId, itemId, isFavorite) => {
  const userRef = doc(db, "users", userId);

  const userDoc = await getDoc(userRef);
  if (!userDoc.exists()) {
    await setDoc(userRef, { favorites: [] }); // 初始收藏欄位
  }

  await updateDoc(userRef, {
    favorites: isFavorite ? arrayRemove(itemId) : arrayUnion(itemId),
  });
};

export const getFavorites = async (userId) => {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);
  return userDoc.exists() ? userDoc.data().favorites || [] : [];
};