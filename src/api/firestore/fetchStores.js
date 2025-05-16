import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export async function fetchStores(){
    const snapshot = await getDocs(collection(db, 'stores'));

    // 轉換快照成符合你資料結構的陣列
  return snapshot.docs.map(doc => {
    const data = doc.data();

    return {
      id: data.id,              // 商品 ID 
      name: data.name,          // 商品名稱
      text: data.text,          // 介紹文字
      price: data.price,        // 價格
      category: data.category,  // 分類
      image: data.image,        // 主要圖片
      star: data.star,          // 評價星數
      like: data.like,          // 按讚數
      discount: data.discount,  // 折扣
      date: data.date,          // 上架日期
      size: data.size,          // 尺寸
      photos: data.photos,      // 多張圖片陣列
      message: data.message     // 留言陣列
    };
  });
}