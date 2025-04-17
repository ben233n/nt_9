import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// 路由對應的 title，可以支援動態路由
const titles = [
  { path: '/', title: 'Naturo 首頁' },
  { path: '/shop', title: 'Naturo 產品' },
  { path: '/shop/:id', title: 'Naturo 產品資訊' }, // 支援 /shop/123
  { path: '/cart', title: 'Naturo 購物車' },
  { path: '/blog', title: 'Naturo 部落格' },
];

// 小工具：判斷當前網址跟設定的 path 是否匹配
const matchPath = (pattern, pathname) => {
  if (pattern.includes(":")) {
    // 動態路由邏輯，比如 /shop/:id
    const base = pattern.split("/:")[0];
    return pathname.startsWith(base);
  }
  return pattern === pathname;
};

const TitleManager = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const matched = titles.find(route => matchPath(route.path, path));
    document.title = matched ? matched.title : '我的網站';
  }, [location.pathname]);

  return null;
};

export default TitleManager;