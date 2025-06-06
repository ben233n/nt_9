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

const Cartpage = () => {
    const isMobile = useMediaQuery({ maxWidth: 992 });

  return (
    <>
        <Air/>
        <Bar step={1}/>
        <motion.div {...FadeInOne} >
          <CartGoods/>
        </motion.div>

        {!isMobile ?(<Foot/>):(
          <Air/>
        )}
    </>
  )
}

export default Cartpage