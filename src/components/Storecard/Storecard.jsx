import React from 'react'
import styles from './Storecard.module.css'
import Love from '../../assets/svg/love.svg?react';
import Car from '../../assets/svg/itemshopcar.svg?react';
import { Link } from 'react-router';
const Storecard = ({name,price,image,itemid,isone}) => {
  return (
    <>
        <Link to={`/shop/${itemid}`} className={isone?styles.one_card:styles.card}>
            <div className={styles.img_div}>
                <img src={image} alt="" className={styles.img}/>
            </div>
            <div className={styles.content} >
                <h3 className={styles.name}>{name}</h3>
                <div className={styles.down}>
                    <h4 className={styles.h4}>${price}</h4>
                    <div className={styles.icon_div}>
                        <Love className={styles.icon}/>
                        <Car className={styles.icon}/>
                    </div>
                </div>
            </div>
        </Link>
    </>

  )
}

export default Storecard