import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from "motion/react"
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import styles from './SwiperItem.module.css';

import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FadeIn } from '../Anime';

const SwiperItem = () => {
    return (
        <>
            <motion.div className={styles.Container} {...FadeIn}>
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
        </>
    );
}

export default SwiperItem;