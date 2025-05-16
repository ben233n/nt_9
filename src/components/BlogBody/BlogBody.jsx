import React from 'react'
import { useState, useEffect} from "react";
import { motion, useAnimation } from 'motion/react'
import styles from './BlogBody.module.css'
import Title from '../Title/Title'
import BlogBodyCard from '../BlogBodyCard/BlogBodyCard'
import { DownLook } from '../Anime'
import { Link } from 'react-router'
import { useQuery } from '@tanstack/react-query';
import { fetchBlog } from '../../api/firestore/fetchBlog'; 

const BlogBody = ({mode}) => {
    const { data, isLoading, isError } = useQuery({
      queryKey: ['blog'],         // 快取的 key 名稱
      queryFn: fetchBlog          // API 函數
    });

  const controls = useAnimation();

  useEffect(() => {
    let isMounted = true; // 追蹤元件是否還活著
  
    const sequence = async () => {
      while (isMounted) {
        // 1. 畫出來
        await controls.start({
          pathLength: 1,
          transition: { duration: 8, ease: "easeOut" }
        });
  
        // 2. 停頓
        await new Promise(res => setTimeout(res, 1000)); // 1秒停頓（原本你是1毫秒，好像太短了）
  
        // 3. 閃爍
        for (let i = 0; i < 3; i++) {
          if (!isMounted) return;
          await controls.start({ opacity: 0.2, transition: { duration: 1 } });
          if (!isMounted) return;
          await controls.start({ opacity: 1, transition: { duration: 1 } });
        }
  
        // 4. 畫回去
        await controls.start({
          pathLength: 0,
          transition: { duration: 8, ease: "easeInOut" }
        });
  
        // 5. 再停頓
        await new Promise(res => setTimeout(res, 2000));
      }
    };
  
    sequence();
  
    return () => {
      isMounted = false; // 元件unmount，取消動畫循環
    };
  }, [controls]);




  switch (mode) {
    case "blog":
      return(
        <>
          <div className={styles.bg}>
              <div className={`${styles.container} container `}>
                  <Title bigtitle="部落格" />
                  <motion.div className={styles.blog} {...DownLook}>
                    {
                      data?.map((oneblog)=>(
                          <BlogBodyCard mode={"blog"} loading={isLoading} key={oneblog.blogid} blogid={oneblog.blogid} date={oneblog.date} name={oneblog.name} content={oneblog.into} img={oneblog.bigimg}/>
                      ))
                    }
                  </motion.div>
              </div>
          </div>
        </>
      )
      case "home":
        return(
          <>
            <div className={styles.bg}>
                  <div className={`${styles.container} container `}>
                    <Title bigtitle={"最新故事"}/>
                    <div className={styles.home}>
                        <div className={styles.left}>
                          <div className={styles.book_box}>
                          <motion.svg className={styles.book} 
                            width="362" 
                            height="333" 
                            viewBox="0 0 362 333" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                          >
                              <motion.path d="M143.783 207.092C135.181 197.231 116.284 176.07 109.509 170.312C101.04 163.113 74.787 147.87 72.6698 151.681C70.9761 154.729 58.1319 216.749 51.9215 247.377C69.7058 254.293 107.476 269.65 116.284 275.747C125.091 281.845 140.561 297.766 147.195 304.964C130.496 295.37 95.6009 275.683 89.6133 273.687C83.6257 271.691 56.1408 262.876 43.1469 258.718L61.2345 170.312C62.8977 168.491 66.2242 164.662 66.2242 163.914C66.2242 162.978 54.459 167.344 51.9215 174.829C49.8915 180.816 39.4046 237.616 34.4149 265.267C40.9157 267.091 53.894 270.926 53.8007 271.673C53.6839 272.607 33.2596 268.872 32.4427 270.273C31.7891 271.393 31.081 275.33 30.8087 277.158C45.8469 279.496 77.2923 284.514 82.7683 285.881C88.2443 287.247 112.382 296.447 123.767 300.875C111.872 298.788 87.02 294.536 82.7683 294.232C78.5166 293.929 40.8842 294.106 22.5994 294.232L43.1469 192.685L30.8087 205.402C20.7756 239.957 0.89177 309.552 1.62163 311.499C2.53395 313.932 83.1268 312.262 91.5469 313.104C99.967 313.946 124.385 320.963 129.718 324.612C133.984 327.531 140.851 330.319 143.752 331.348L177.713 329.383C180.145 326.015 185.796 318.662 188.939 316.192C192.869 313.104 245.354 302.439 261.914 300.755C275.161 299.408 301.301 297.013 312.715 295.983L265.216 205.753C264.503 204.47 262.706 202.074 261.222 202.758C259.368 203.614 279.478 240.981 279.763 241.837C279.991 242.521 290.412 264.941 295.594 276.066C296.45 277.777 297.905 281.257 296.878 281.485C295.594 281.771 238.276 169.373 237.488 168.585C236.7 167.796 235.281 164.328 234.177 165.274C233.073 166.22 272.692 248.998 272.439 250.514C272.186 252.029 227.981 269.738 221.918 272.743C217.068 275.146 192.28 291.427 180.491 299.266C205.796 289.981 257.507 271.178 261.914 270.243C267.422 269.076 283.966 265.408 285.913 269.076C287.859 272.743 223.037 287.57 223.822 288.929C224.606 290.288 276.922 282.701 279.763 282.701C282.604 282.701 294.088 282.506 293.893 284.647C293.699 286.788 221.892 295.455 207.666 299.266C193.441 303.078 158.422 322.603 156.865 320.461C155.307 318.32 149.023 211.58 151.025 219.052C153.027 226.524 161.087 303.542 162.509 304.964C163.932 306.387 248.989 229.368 261.222 238.517C255.749 225.437 233.749 176.88 223.432 154.236C207.082 162.311 172.592 181.323 165.429 192.776C156.475 207.092 151.609 212.24 148.884 208.931C146.159 205.622 146.159 167.724 165.429 166.499C184.699 165.274 185.672 172.338 197.156 172.143C208.64 171.949 213.27 175.258 225.379 145.867C237.488 116.475 239.783 122.704 253.797 123.288C267.811 123.872 289.027 131.268 298.759 105.77C308.492 80.2718 312.302 63.5637 312.302 58.1409C312.302 52.7181 289.302 36.8238 266.675 50.6613C277.334 74.0353 281.074 80.5799 286.123 80.9539C291.171 81.3278 301.082 80.7669 308.001 70.2953C314.919 59.8237 320.716 47.4822 329.692 48.0432C338.668 48.6042 355.497 56.0839 360.172 55.8969C355.123 64.8725 344.277 82.4498 326.139 83.9457C308.001 85.4417 314.919 64.1246 318.472 63.3766C322.025 62.6286 305.944 15.5066 272.846 7.2789C266.675 28.596 273.968 53.2788 289.676 55.7098C305.383 58.1409 310.806 57.0188 318.472 47.2952C326.139 37.5716 339.228 17.3764 358.115 11.5797C356.432 37.1976 352.692 60.1977 333.993 60.3846C315.293 60.5716 313.985 54.0269 316.228 46.3602C318.472 38.6935 335.115 -0.200855 342.594 0.734107C350.074 1.66907 353.814 6.15686 352.879 7.2789C351.944 8.40094 341.846 -0.387694 337.92 1.66922C333.993 3.72614 314.92 31.214 314.172 33.4579C313.424 35.7018 313.05 43.9295 314.172 43.3685C315.293 42.8075 321.464 12.5148 304.635 1.66922" 
                                stroke="currentColor" 
                                strokeWidth="1.33"
                                initial={{ pathLength: 0, opacity: 1 }}
                                animate={controls}
                              />
                          </motion.svg>

                          </div>
                          <Link to="/Blog" className={styles.btn_box}><button className={styles.btn}>前往部落格</button></Link>
                        </div>
                        <div className={styles.right}>
                          {
                              (data ?? []).slice(0, 3).map((oneblog) => (
                                <BlogBodyCard mode={"home"} loading={isLoading} key={oneblog.blogid} blogid={oneblog.blogid} date={oneblog.date} name={oneblog.name} content={oneblog.into} />
                              ))
                          }
                        </div>
                    </div>
                  </div>
            </div>
          </>
        )
    default:
      return null;
  }
}

export default BlogBody