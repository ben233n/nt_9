import React, { useState } from 'react'
import Air from '../../components/Air/Air'
import Foot from '../../components/Foot/Foot'
import From from '../../components/From/From';
import { Ad } from '../../components/Ad/Ad';
import { useSelector } from 'react-redux';
import Out from '../../components/Out/Out';

const MyUser = () => {
  const isLogin=useSelector((state)=>state.auth.user)
  return (
    <>
        <Air/>
        {isLogin?(
          <>
            <Ad/>
            <Out/>
          </>
      ):(<From/>)}
        <Foot/>
    </>
  )
}

export default MyUser