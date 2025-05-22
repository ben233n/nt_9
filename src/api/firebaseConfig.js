// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9AzXWqA199-FtaGap3tH8V_bjy5YzmsQ",
  authDomain: "natuto-919fe.firebaseapp.com",
  projectId: "natuto-919fe",
  storageBucket: "natuto-919fe.firebasestorage.app",
  messagingSenderId: "592291466876",
  appId: "1:592291466876:web:82c0324383ae6aacdb43f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// 初始化 Authentication 和 Firestore
const auth = getAuth(app);          // ✅ 初始化 auth
const db = getFirestore(app);       // ✅ Firestore 已經正確

const storage = getStorage(app); // Storage 初始化 ✅

export { auth, db , storage};                // ✅ 導出兩個物件