import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export async function fetchBlog(){
    const snapshot = await getDocs(collection(db, 'blog'));

    // 轉換快照成符合你資料結構的陣列
  return snapshot.docs.map(doc => {
    const data = doc.data();

    return {
      blogid:data.blogid,
      name:data.name  ,
      into:data.into ,
      shopid:data.shopid,
      date:data.date  ,
      bigimg:data.bigimg,
      article:data.article,
    };
  });
}