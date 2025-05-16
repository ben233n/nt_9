import React from 'react'
import { feedBlog } from '../../api/firestore/createBlog'

const Updata = () => {
    const handleUpload = async () => {
        try {
          await feedBlog();
          alert("資料上傳成功！");
        } catch (error) {
          console.error("上傳失敗", error);
          alert("資料上傳失敗！");
        }
      };
    
      return (
        <div>
          <h1>後台資料上傳</h1>
          <button onClick={handleUpload}>同步 Firestore</button>
        </div>
      );
}

export default Updata