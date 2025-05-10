import React from 'react'
import { useState, useEffect} from "react";
import Air from '../../components/Air/Air'
import { useParams } from 'react-router'
import BlogBodyCard from '../../components/BlogBodyCard/BlogBodyCard'
import Foot from '../../components/Foot/Foot'
import Blogpagebody from '../../components/Blogpagebody/Blogpagebody';

const Blogpage = () => {
  
  const {id}=useParams();
  
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
  
  const blogdata = data.find(item=>item.blogid === Number(id) );
  if(!blogdata){
    return (
      <>
        <div>沒檔案</div>
      </>
    )
  }

  return (

    <>
     <Air/>
     <Blogpagebody blog={blogdata}/>
    </>
  )
}

export default Blogpage