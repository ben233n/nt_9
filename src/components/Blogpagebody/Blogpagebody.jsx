import React, { useEffect } from 'react';
import styles from './Blogpagebody.module.css';
import fullpage from 'fullpage.js';
import 'fullpage.js/dist/fullpage.css';

const Blogpagebody = () => {
  useEffect(() => {
    new fullpage('#fullpage', {
      licenseKey: 'YOUR_LICENSE_KEY',
      autoScrolling: true,
      navigation: true,
      anchors: ['mode1', 'mode2', 'mode3', 'mode4', 'mode5'],
      scrollingSpeed: 800,
    });

    return () => {
      if (window.fullpage_api && window.fullpage_api.destroy) {
        window.fullpage_api.destroy('all');
      }
    };
  }, []);

  return (
    // ✅ 外層包一層背景圖容器
    <div className={styles.backgroundContainer}>
      <div id="fullpage">
        <div className={`section ${styles.section} ${styles.mode1}`}>
          <div>模式一：自然風格</div>
        </div>
        <div className={`section ${styles.section} ${styles.mode2}`}>
          <div>模式二：科技感</div>
        </div>
        <div className={`section ${styles.section} ${styles.mode3}`}>
          <div>模式三：懷舊復古</div>
        </div>
        <div className={`section ${styles.section} ${styles.mode4}`}>
          <div>模式四：極簡主義</div>
        </div>
        <div className={`section ${styles.section} ${styles.mode5}`}>
          <div>模式五：可愛風</div>
        </div>
      </div>
    </div>
  );
};

export default Blogpagebody;