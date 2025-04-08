import React from 'react'
import Head from '../../components/Head/Head'
import Foot from '../../components/Foot/Foot'
import Air from '../../components/Air/Air'
import Cartinside from '../../components/Cartinside/Cartinside'

import { useMediaQuery } from "react-responsive";

const Cartpage = () => {
    const isMobile = useMediaQuery({ maxWidth: 690 });
  return (
    <>
        <Head/>
        <Air/>
        <Cartinside/>
        {!isMobile && <Foot/>}
    </>
  )
}

export default Cartpage