import React from 'react'
import Foot from '../../components/Foot/Foot'
import Air from '../../components/Air/Air'

import { useMediaQuery } from "react-responsive";
import Bar from '../../components/Bar/Bar'
import { motion } from "motion/react"
import { FadeInOne } from '../../components/Anime'
import { useSelector } from 'react-redux'
import CartCheckBody from '../../components/CartCheckBody/CartCheckBody';


const CartCheckPage = () => {
    const isMobile = useMediaQuery({ maxWidth: 992 });
    const checkout = useSelector(state => state.checkout);
    console.log('Redux checkout 狀態：', checkout);


  return (

    <>
        <Air/>
        <Bar step={3}/>
        <motion.div {...FadeInOne}>
          <CartCheckBody/>
        </motion.div>
        {!isMobile ?(<Foot/>):(
          <Air/>
        )}
    </>
  )
}

export default CartCheckPage