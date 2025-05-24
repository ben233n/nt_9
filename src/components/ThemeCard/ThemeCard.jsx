import React from 'react'
import styles from './ThemeCard.module.css'

const ThemeCard = ({topColor,apColor,supColor,adColor,themeName,onSelect,bgImg,selected}) => {
  return (
    <>
        <div className={`${styles.bg} `} style={{
                '--theme-top-color': topColor,
                '--theme-ap-color': apColor,
                '--theme-sup-color': supColor,
                '--theme-ad-color': adColor,
                '--bg-img':bgImg
        }}>
            <div className={`${styles.color} ${selected ? styles.selected : ''} `}
            onClick={() => onSelect(themeName)}>
                <div className={styles.top}></div>
                    <div className={styles.ap}>
                    <div className={styles.sup2}></div>
                    <div className={styles.sup}></div>
                </div>
                <div className={styles.ad}></div> 
            </div>
            <p className={styles.p}>{themeName}</p>
        </div>

    </>

  )
}

export default ThemeCard