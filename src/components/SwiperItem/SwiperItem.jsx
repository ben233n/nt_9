import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from "motion/react"
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router'
 
import styles from './SwiperItem.module.css';

import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FadeIn, FadeInOne } from '../Anime';

const SwiperItem = ({mode="預設"}) => {
  switch (mode) {
    case "預設":
      return (
        <motion.div className={styles.Container} {...FadeInOne}>
          <Swiper
              slidesPerView={1}
              loop={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className={styles.mySwiper}
              autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
          >
            <SwiperSlide className={styles.swiperSlide}><img src="https://res.cloudinary.com/daimwhvru/image/upload/f_webp,q_auto/v1744807406/trees-1850902_1280_ssfadi.jpg" loading="lazy" alt="圖1" className={styles.img}/></SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}><img src="https://res.cloudinary.com/daimwhvru/image/upload/f_webp,q_auto/v1744808547/nature-5061217_1280_dfbxsw.jpg" loading="lazy" alt="圖3" className={styles.img}/></SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}><img src="https://res.cloudinary.com/daimwhvru/image/upload/f_webp,q_auto/v1744808697/coast-2723729_1280_gf5s2f.jpg" loading="lazy" alt="圖2" className={styles.img}/></SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}><img src="https://res.cloudinary.com/daimwhvru/image/upload/f_webp,q_auto/v1744808847/new-zealand-3673339_1280_xlngra.jpg" alt="圖4" className={styles.img}/></SwiperSlide>
          </Swiper>
        </motion.div>
      )
    
    case "store":
      return (
        <motion.div className={styles.Container} {...FadeInOne}>
          <Swiper
              slidesPerView={1}
              loop={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className={styles.mySwiper}
              autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
          >
            <SwiperSlide className={styles.swiperSlide}>
              <div className={styles.one_ad}>
                <div className={styles.p_box}>
                  <h3 className={styles.h3}>
                    新產品將在6月7日登場
                  </h3>
                  
                  
                </div>
                <img src="https://res.cloudinary.com/daimwhvru/image/upload/v1747224248/winter-7617474_1280_noq4su.jpg" loading="lazy" alt="圖1" className={styles.img_1}/>
              </div>
              
              </SwiperSlide>
          </Swiper>
        </motion.div>
      )    
  
    default:
      return null;
  }
    
}

export default SwiperItem;