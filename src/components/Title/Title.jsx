import React from 'react'
import styles from './Title.module.css'
const Title = ({bigtitle}) => {
  return (
    <>
        <div className={styles.container}>
            <div className={styles.line}></div>
            <div className={styles.text}>{bigtitle}</div>
            <div className={styles.line}></div>
        </div>

    </>
  )
}

export default Title