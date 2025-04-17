import React from 'react'
import styles from './Alert.module.css'
import { useEffect } from "react"; // 使用 useEffect 管理倒數時間
import { useSelector, useDispatch } from "react-redux";
import { hideToast } from "../../redux/toastSlice";
import { AnimatePresence, motion } from "framer-motion";


const Alert = () => {
    const { message, visible,id } = useSelector((state) => state.toast);
    const dispatch = useDispatch(); // 建立 dispatch 函式用來發送 action

    // 如果 visible 為 true，啟動一個計時器自動隱藏
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        dispatch(hideToast()); // 計時器結束後，dispatch 隱藏 Toast
      }, 2500); // 顯示 2.5 秒
      return () => clearTimeout(timer); // 元件卸載或 visible 改變時清除 timer
    }
  }, [visible, dispatch]); // 當 visible 或 dispatch 改變時重新執行

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={id}
          className={styles.toastContainer} // 套用樣式
          initial={{ opacity: 0, y: 20 }} // 初始動畫狀態（下方 + 透明）
          animate={{ opacity: 1, y: 0 }} // 顯示時動畫（滑上來 + 淡入）
          exit={{ opacity: 0, y: 20 }} // 離開時動畫（滑下去 + 淡出）
          transition={{ duration: 0.3 }} // 動畫持續 0.3 秒
        >
          {message} {/* 顯示 Redux 中的訊息 */}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Alert