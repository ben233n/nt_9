


export const FadeIn = {
  initial: { opacity: 0 }, // 初始透明
  whileInView: { opacity: 1 }, // 當進入畫面時變成不透明
  transition: { duration: 0.6, delay: 0 , ease: "easeInOut"}, // 動畫時間與延遲
  viewport: { once: false, amount: 0.8 }, // 每次都觸發，當元素約有 30% 進入畫面
};

export const FadeInBangBig = {
  initial:{opacity: 0, scale: 0.8 },
  whileInView:{ opacity: 1, scale: 1 },
  transition:{ duration: 0.8, ease: "easeInOut" },
  viewport:{ once: false, amount: 0.8 }
};

// 由下往上慢滑出來
export const DownLook = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: "easeInOut" }
};

export const DownLookMask = {
  initial: { y: "100%",opacity: 0 },
  whileInView: { y: "0%",opacity: 1 },
  transition: { duration: 1, ease: "easeInOut" },
};






// 套在父物體，搭配下面的函式，實現子物體延遲從左往右出現
export const LeftLookDelay = {
  initial: "hidden",
  whileInView: "visible",
  transition: {
    staggerChildren: 0.2
  },
  
};

// 套在子物體，搭配上面的函式，實現子物體延遲從左往右出現
export const LeftLookItem = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeInOut" } }
};



// 套在父物體，搭配下面的函式，實現子物體延遲從右往左出現
export const RightLookDelay = {
  initial: "hidden",
  whileInView: "visible",
  transition: {
    staggerChildren: 0.2
  },
  
};

// 套在子物體，搭配上面的函式，實現子物體延遲從右往左出現
export const RightLookItem = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeInOut" } }
};




// 從左往右滑出來
export const LeftLook = {
  initial: { opacity: 0, x: -100 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 1, ease: "easeInOut" },
  viewport: { once: false, amount: 0.3 }
};
// 從右往左滑出來
export const RightLook = {
  initial: { opacity: 0, x: 100 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 1, ease: "easeInOut" },
  viewport: { once: false, amount: 0.3 }
};



// 視差滾動背景
export const ParallaxScroll = {
  initial: { y: 0 },
  whileInView: { y: -50 },
  transition: { duration: 1.2, ease: "easeInOut" },
  viewport: { once: false, amount: 0.3 }
};

export const HoverScaleUp = {
  whileInView: { scale: 1 },
  whileHover: { scale: 1.1, boxShadow: "0px 0px 12px rgba(0,0,0,0.2)" },
  transition: { type: "spring", stiffness: 300, ease: "easeInOut" },
  viewport: { once: false, amount: 0.3 }
};