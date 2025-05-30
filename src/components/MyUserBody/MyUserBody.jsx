import React, { useEffect, useState } from 'react'
import styles from './MyUserBody.module.css'
import Out from '../Out/Out'
import Oldericon from '../../assets/svg/oldersvg.svg?react'
import Love from '../../assets/svg/loveno.svg?react'
import UserEdit from '../../assets/svg/useredit.svg?react'
import Brush from '../../assets/svg/brush.svg?react'
import { color } from 'motion/react'
import Theme from '../Theme/Theme'
import MyData from '../MyData/MyData'
import { motion } from "motion/react"
import { FadeInOne } from '../Anime'
import MyLove from '../MyLove/MyLove'
import Order from '../Order/Order'
import { db } from '../../api/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners';
import Skeleton from 'react-loading-skeleton';
import { useMediaQuery } from "react-responsive";

const MyUserBody = () => {
  const isMobile = useMediaQuery({ maxWidth: 700 });
  const user =useSelector(state=>state.auth.user)

    const [whoLight,setWhoLight]=useState(1);

    const [info,setInfo]=useState({ displayName: '', avatarUrl: '' })

    const [imageLoading, setImageLoading] = useState(true)

    const renderContent = () => {
        switch (whoLight) {
          case 0:
            return <MyData/>
          case 1:
            return <Order/>
          case 2:
            return <MyLove/>
          case 3:
            return <Theme/>
          default:
            return null
        }
      }



      useEffect(() => {
        const fetchData = async () => {
          if (user?.uid) {
            const docRef = doc(db,'users', user.uid);
            const userData = await getDoc(docRef);
            
            if (userData.exists()) {
              const data = userData.data();
              setInfo({
                displayName: data.displayName,
                avatarUrl: data.avatarUrl || '/default-avatar.png',
                subscriptionTier:data.subscriptionTier || null,
                subscriptionActive:data.subscriptionActive || false
              });
            }
          }
        };
      
        fetchData(); // ✅ 在 useEffect 外部呼叫函數本體
      }, [user]);

      const handleImageLoaded = () => {
        setImageLoading(false)
      }
    
      const handleImageError = () => {
        setImageLoading(false)
      }


  return (
    <>
        <div className={styles.bg}>
             <div className={`${styles.container} container `}>
                 <motion.div className={styles.left} {...FadeInOne}>
                  <div className={styles.up_box} >
                  
                      {/* 照片容器 */}
                      <div className={styles.head_div}>
                        {imageLoading && <div className={styles.loader}>
                          <ClipLoader color="var(--text-ttitle-color)" size={40} />
                          </div>}
                        <img
                          src={info.avatarUrl}
                          alt="用戶頭像"
                          className={`${styles.head} ${imageLoading ? styles.hidden : ''}`}
                          onLoad={handleImageLoaded}
                          onError={handleImageError}
                        />
                        
                      </div>
                      {/* 名字 和登出*/}
                      <div className={styles.name_and_out}>
                      <div className={styles.name_and_member}>
                        {info.displayName ? (
                          <h3 className={styles.name}>{info.displayName}</h3>
                          ) : (
                            <Skeleton width={50} height={24}  baseColor="var(--loading-color)"/>
                          )}

                          {info.subscriptionActive===true &&(
                            info.displayName ? (
                              <h3 className={styles.member}> {info.subscriptionTier} </h3>
                              ) : (
                                <Skeleton width={80} height={24}  baseColor="var(--loading-color)"/>
                              )
                            )

                          }
                        
                      </div>
                      
                        
                        {
                          isMobile &&(
                            <Out className={styles.out} />
                          )
                        }
                        
                      </div>
                    </div>
                    
                    {/* 服務 */}
                    <div className={styles.serve}>
                        <p className={styles.project} onClick={()=>(setWhoLight(0))}
                            style={{color:whoLight===0?'var(--text-ttitle-color)':'var(--text-header-color)'}}> <UserEdit/>基本資料</p>
                         <p className={styles.project} onClick={()=>(setWhoLight(1))}
                            style={{color:whoLight===1?'var(--text-ttitle-color)':'var(--text-header-color)'}}> <Oldericon/> 訂單查詢</p>
                         <p className={styles.project} onClick={()=>(setWhoLight(2))}
                            style={{color:whoLight===2?'var(--text-ttitle-color)':'var(--text-header-color)'}}> <Love/> 我的收藏</p>
                         <p className={styles.project} onClick={()=>(setWhoLight(3))}
                            style={{color:whoLight===3?'var(--text-ttitle-color)':'var(--text-header-color)'}}> <Brush/> 外觀設定</p>

                    </div>

                    
                    {
                      !isMobile &&(
                        <div className={styles.out_box}>
                        <Out className={styles.out} />
                        </div>
                      )
                    }


                </motion.div>
                <motion.div className={whoLight===1 ? styles.right_order:styles.right}  {...FadeInOne} key={whoLight}>
                    {renderContent()}
                </motion.div>
             </div>
        </div>
    </>
  )
}

export default MyUserBody