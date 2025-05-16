import { collection, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore";
import blog from "../../components/json/blog.json";
import { db } from "../firebaseConfig";

const blogCollection = collection(db, "blog");

export const feedBlog = async () => {
  // 先取得所有 blog collection 裡的文件
  const snapshot = await getDocs(blogCollection);

  // 刪除現有所有文件（使用 docSnap.id 才對）
  await Promise.all(
    snapshot.docs.map((docSnap) => deleteDoc(doc(db, "blog", docSnap.id)))
  );

  // 重新新增 blog.json 內的內容，文檔 ID 使用 blogid 轉字串
  await Promise.all(
    blog.map(async (product) => {
      const docId = product.blogid.toString(); 
      await setDoc(doc(db, "blog", docId), {
        ...product,
        category: product.category?.toUpperCase() || "", // 防止 category 欄位不存在造成錯誤
      });
    })
  );
};