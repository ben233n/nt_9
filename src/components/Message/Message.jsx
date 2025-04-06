import React from 'react'
import styles from './Message.module.css';
import Star from "../../assets/svg/star.svg?react";
const Message = ({usename,ueshead,star,speak,date}) => {
  return (
    <>
        <div className={styles.bg}>
            <div className={styles.up}>
                <div className={styles.head_div}>
                    <img src={ueshead} alt="" className={styles.head}/>
                </div>
                <div className={styles.name_and_date}>
                    <h4 className={styles.name}>{usename}</h4>
                    <h5 className={styles.date}>{date}</h5>
                </div>
            </div>
            <div className={styles.down}>
                <div className={styles.star_div}>
                    {
                        Array.from({length:5},(_,index)=>(
                            <Star key={index} className={star>index?styles.star_icon:styles.star_no_icon}/>
                        ))
                    }
                    <p className={styles.speak}>
                        {speak}
                    </p>
                </div>
            </div>
        </div>    
    </>

  )
}

export default Message