import React, { useEffect } from 'react';
import styles from './Blogpagebody.module.css';
import fullpage from 'fullpage.js';
import 'fullpage.js/dist/fullpage.css';
import { motion ,useAnimation} from "motion/react"
// import Down from '../../assets/svg/down.svg?react';
import Downjs from '../Downjs/Downjs';
import { DownLook, DownLookDelay, DownLookItem } from '../Anime';

const Blogpagebody = ({ blog }) => {

  useEffect(() => {
    new fullpage('#fullpage', {
      licenseKey: 'YOUR_LICENSE_KEY',
      autoScrolling: true,
      navigation: false,
      anchors: blog.article.map((_, i) => `section${i}`),
      scrollingSpeed: 800,
    });

    return () => {
      if (window.fullpage_api && window.fullpage_api.destroy) {
        window.fullpage_api.destroy('all');
      }
    };
  }, [blog]);

  const moveSectionDown = () => {
    if (window.fullpage_api && window.fullpage_api.moveSectionDown) {
      window.fullpage_api.moveSectionDown();
    }
  };

  return (
    <div
      className={styles.backgroundContainer}
      style={{ backgroundImage: `url(${blog.bigimg})` }}
    >
      <motion.div className={styles.backgroundOverlay}
          initial={{ "--blur": "0px" }}
          whileInView={{ "--blur": "10px" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
      ></motion.div>
      <div className={styles.fullpageWrapper}>
        <div id="fullpage" >
          {blog.article.map((item, index) => {
            switch (item.type) {
              case 'home':
                return (
                  <div className={`section ${styles.section} ${styles.mode1}`} key={index}>
                    <motion.div className={styles.cover} {...DownLookDelay}>
                      <motion.h1 variants={DownLookItem} className={styles.title}>{item.title}</motion.h1>
                      <motion.h3 variants={DownLookItem}  className={styles.smalltitle}>【 {item.smalltitle} 】</motion.h3>
                      <motion.p variants={DownLookItem}  className={styles.date}>{item.date}</motion.p>
                      { item.end!=='true' &&(
                          <motion.div variants={DownLookItem} onClick={moveSectionDown}>
                          <Downjs size='72'/>
                        </motion.div>)
                      }

                    </motion.div>
                  </div>
                );
              case 'imageLeft':
                return (
                  <motion.div className={`section ${styles.section} ${styles.mode2}`} key={index} {...DownLookDelay}>
                      <motion.div variants={DownLookItem} className={`${styles.img_box} ${styles.img_mode2_box}`}>
                        <div className={styles.img_mask}>
                          <img src={item.image} alt="" className={styles.img}/>
                        </div>

                      </motion.div>
                      <motion.div variants={DownLookItem} className={`${styles.text_box} ${styles.text_mode2_box}`}>
                        <div className={styles.text_y_box}>
                          <h3 className={styles.chapter_title}>{item.title}</h3>
                          <p className={styles.chapter_p}>{item.text}</p>
                        </div>

                        { item.end!=='true' &&(
                          <motion.div variants={DownLookItem} onClick={moveSectionDown} className={styles.down_mode2}>
                            <Downjs size='96'/>
                          </motion.div>
                        )}
                      </motion.div>

                  </motion.div>
                );
              case 'imageRight':
                return (
                  <motion.div className={`section ${styles.section} ${styles.mode2}`} key={index} {...DownLookDelay}>
                      <motion.div variants={DownLookItem} className={`${styles.img_box} ${styles.img_mode3_box}`}>
                        <div className={styles.img_mask}>
                          <img src={item.image} alt="" className={styles.img}/>
                        </div>

                      </motion.div>
                      <motion.div variants={DownLookItem} className={`${styles.text_box} ${styles.text_mode3_box}`}>
                        <div className={styles.text_y_box}>
                          <h3 className={styles.chapter_title}>{item.title}</h3>
                          <p className={styles.chapter_p}>{item.text}</p>
                        </div>
                        { item.end!=='true' &&(
                          <motion.div variants={DownLookItem} onClick={moveSectionDown} className={styles.down_mode2}>
                            <Downjs size='96'/>
                          </motion.div>
                        )}
                      </motion.div>

                  </motion.div>
                );
              case 'textCenter':
                return (
                  <div className={`section ${styles.section} ${styles.mode4}`} key={index}>
                    <motion.div className={styles.text_center} {...DownLookDelay}>
                      <motion.h1 variants={DownLookItem} className={styles.chapter_title}>{item.title}</motion.h1>
                      <motion.p variants={DownLookItem}  className={styles.chapter_p}>{item.text}</motion.p>
                      <motion.div variants={DownLookItem} onClick={moveSectionDown}>
                        <Downjs size='72'/>
                      </motion.div>
                    </motion.div>

                  </div>
                );
              case 'textCenterAndImg':
                return (
                  <div className={`section ${styles.section} ${styles.mode4}`} key={index}>
                    <motion.div className={styles.text_center} {...DownLookDelay}>
                      <motion.div variants={DownLookItem} className={`${styles.img_box} ${styles.img_mode5_box}`}>
                        <div className={styles.img_mask}>
                          <img src={item.image} alt="" className={styles.img}/>
                        </div>

                      </motion.div>
                      <motion.h1 variants={DownLookItem} className={styles.chapter_title}>{item.title}</motion.h1>
                      <motion.p variants={DownLookItem}  className={styles.chapter_p}>{item.text}</motion.p>
                      <motion.div variants={DownLookItem} onClick={moveSectionDown}>
                        <Downjs size='72'/>
                      </motion.div>

                    </motion.div>

                  </div>
                );
              default:
                return null;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Blogpagebody;
