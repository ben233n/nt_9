import React, { useState } from 'react'
import Head from '../../components/Head/Head'
import Foot from '../../components/Foot/Foot'
import Air from '../../components/Air/Air'
import Cartinside from '../../components/Cartinside/Cartinside'

import { useMediaQuery } from "react-responsive";
import Bar from '../../components/Bar/Bar'
import CartGoods from '../../components/CartGoods/CartGoods'

const Cartpage = () => {
    const isMobile = useMediaQuery({ maxWidth: 690 });

    const [step,setStep]=useState(1);
    const stepPage = () => {
      switch (step) {
        case 1:
          return <CartGoods/>
        case 2:
          return <div>填資料</div>
        case 3:
          return <div>訂單確認</div>
        default:
          return null
      }
    }
  return (
    <>
        <Air/>
        <Bar step={step}/>
        {/* <p onClick={()=>(setStep(step+1))}>sdsad</p> */}
        {stepPage()}
        {/* <Cartinside/> */}
        {!isMobile && <Foot/>}
    </>
  )
}

export default Cartpage