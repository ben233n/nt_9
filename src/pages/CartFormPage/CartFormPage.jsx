import React, { useState } from 'react'
import Head from '../../components/Head/Head'
import Foot from '../../components/Foot/Foot'
import Air from '../../components/Air/Air'
import Cartinside from '../../components/Cartinside/Cartinside'

import { useMediaQuery } from "react-responsive";
import Bar from '../../components/Bar/Bar'
import CartGoods from '../../components/CartGoods/CartGoods'
import { motion } from "motion/react"
import { FadeInOne } from '../../components/Anime'
import { useSelector } from 'react-redux'
import CartFormBody from '../../components/CartFormBody/CartFormBody'


const CartFormPage = () => {
  const isMobile = useMediaQuery({ maxWidth: 992 });
  const checkout = useSelector(state => state.checkout);
  console.log('Redux checkout 狀態：', checkout);
  return (
    <>
        <Air/>
        <Bar step={2}/>
        <motion.div {...FadeInOne}>
          <CartFormBody/>
        </motion.div>
        {!isMobile ?(<Foot/>):(
          <Air/>
        )}
    </>
  )
}

export default CartFormPage