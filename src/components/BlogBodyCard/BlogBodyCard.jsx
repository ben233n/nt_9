import React from 'react'
import { motion } from 'motion/react'
import styles from './BlogBodyCard.module.css'
import { Link } from 'react-router'

const BlogBodyCard = ({img,name,content,blogid,mode,date}) => {
  {
    switch (mode) {
      case "blog":
        return (
          <>

            <Link to={`/blog/${blogid}`} className={styles.bg}>
                  {/* 上 圖片 */}
                  <div className={styles.up}>
                      <img src={img} alt=""  className={styles.img} loading="lazy"/>
                  </div>
                  {/* 下 文字*/}
                  <div className={styles.down}>
                      <h3 className={styles.name}>{name}</h3>
                      <p className={styles.p}>{content}</p>
                  </div>
                  <div className={styles.end}>
                          <p className={styles.p}>{date}</p>
                    </div>
              </Link>
          </>
        )
        case "home":
          return (
            <>
  
              <Link to={`/blog/${blogid}`} className={styles.bg}>
                    <div className={styles.down_home}>
                        <h3 className={styles.name}>{name}</h3>
                        <p className={styles.p}>{content}</p>
                    </div>
                    <div className={styles.end}>
                          <p className={styles.p}>{date}</p>
                    </div>

                </Link>
            </>
          )
    
      default:
        return null;
    }
    }
  
}

export default BlogBodyCard