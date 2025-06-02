import React from 'react'
import Head from '../../components/Head/Head'
import Foot from '../../components/Foot/Foot'
import Air from '../../components/Air/Air'
import Store from '../../components/Store/Store'
import SwiperItem from '../../components/SwiperItem/SwiperItem'

const Shop = () => {
  return (
    <>
        <Air/>
        <SwiperItem mode='store'/>
        <Store/>
        <Foot/>
    </>
  )
}

export default Shop