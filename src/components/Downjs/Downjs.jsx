import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import styles from './Downjs.module.css';

const Downjs = ({size}) => {
  const [isHovered, setIsHovered] = useState(false);       // 滑鼠是否在上方
  const controls = useAnimation();                         // 控制動畫播放

  // 初始循環動畫（背景呼吸動畫）
  const loopAnimation = {
    pathLength: [0, 1, 1, 1, 1, 1, 0],   // 線條畫出 → 保持
    opacity:    [0, 1, 1, 1, 1, 0.5, 0], // 配合透明度淡出
    y:          [0, -4, 4, -4, 4, 0, 0], // 漂浮 2 次（上 → 下 → 上 → 下 → 回原位）
    transition: {
      duration: 8,                       // 速度比原本更慢（原本是 4）
      times:    [0, 0.15, 0.3, 0.45, 0.6, 0.85, 1],
      ease:     'easeInOut',
      repeat: Infinity,
      repeatDelay: 1.2                  // 重複前等待時間
    }
  };

  // hover 動畫（快速顯示）
  const hoverAnimation = {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.2 }
  };

  // 滑鼠移開時淡出動畫（只播一次）
  const fadeOutAnimation = {
    opacity: 0,
    transition: { duration: 0.5 }
  };

  // 控制動畫流程
  useEffect(() => {
    if (isHovered) {
      controls.stop();                // 停止任何正在執行的動畫（避免重疊）
      controls.start(hoverAnimation); // 播放 hover 動畫
    } else {
      controls.stop();                         // 停止 hover 動畫
      controls.start(fadeOutAnimation).then(() => {
        controls.start(loopAnimation);         // 淡出完成後再啟動循環動畫
      });
    }
  }, [isHovered, controls]);

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="-4 -4 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setIsHovered(true)}   // 滑鼠進入
      onMouseLeave={() => setIsHovered(false)}  // 滑鼠離開
      style={{ cursor: 'pointer', color: '#000' }}
    >
      {/* 外圈圓形 */}
      <motion.path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={controls}
        className={styles.down}
      />
      {/* 向下箭頭 */}
      <motion.path
        d="M8.46997 10.74L12 14.26L15.53 10.74"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={controls}
        className={styles.down}
      />
    </motion.svg>
  );
};

export default Downjs;