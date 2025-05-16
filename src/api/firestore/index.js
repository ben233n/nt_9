import { collection, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore";
import store from "../../components/json/store.json";
import { db } from "../firebaseConfig";

const storesCollection = collection(db, "stores");

export const feedStores = async () => {
  // 先清空原本的 stores 集合
  const snapshot = await getDocs(storesCollection);
  await Promise.all(snapshot.docs.map((docSnap) => deleteDoc(doc(db, "stores", docSnap.id))));

  // 逐筆加入新的資料，使用 product.id 作為 Firestore 文檔 ID
  await Promise.all(
    store.map(async (product) => {
      const docId = product.id.toString(); // 強制轉字串作為文檔 ID
      await setDoc(doc(db, "stores", docId), {
        ...product,
        category: product.category.toUpperCase(), // 若你仍要轉大寫
      });
    })
  );
};