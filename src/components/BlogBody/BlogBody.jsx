import React from 'react'
import { useState, useEffect} from "react";
import { motion } from 'motion/react'
import styles from './BlogBody.module.css'
import Title from '../Title/Title'
import BlogBodyCard from '../BlogBodyCard/BlogBodyCard'
import { DownLook } from '../Anime'

const BlogBody = () => {
    // 下面是匯入檔案的動態資料變數
    const [data, setData] = useState([]); // 存放商品資料
    const [loading, setLoading] = useState(true); // 是否正在載入
    const [error, setError] = useState(null); // 錯誤訊息
useEffect(() => {
    fetch("/json/blog.json") // 從 public/json/store.json 載入
      .then((res) => {
        if (!res.ok) {
          throw new Error("無法載入商品資料");
        }
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  // if (loading) return <p>載入中...</p>;
  // if (error) return <p>錯誤: {error}</p>;

  return (
    <>
        <div className={styles.bg}>
            <div className={`${styles.container} container `}>
                <Title bigtitle="部落格" />
                <motion.div className={styles.blog} {...DownLook}>
                  {
                    data.map((oneblog)=>(
                      <>
                        <BlogBodyCard key={oneblog.blogid} blogid={oneblog.blogid} name={oneblog.name} content={oneblog.into} img={oneblog.bigimg}/>
                      </>
                    ))
                  }
                </motion.div>
            </div>
        </div>
    </>
  )
}

export default BlogBody