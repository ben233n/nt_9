import React from 'react'
import Head from '../../components/Head/Head'
import { useState, useEffect } from "react";
import Big from '../../components/Big/Big';
import Hope from '../../components/Hope/Hope';
import Fire from '../../components/Fire/Fire';
import Plan from '../../components/Plan/Plan';
import Foot from '../../components/Foot/Foot';
import BlogBody from '../../components/BlogBody/BlogBody';
import Updata from '../../components/Updata/Updata';
import Grass from '../../components/Grass/Grass';
const Home = () => {

  return (
    <>
        <Big/>
        <Hope/>
        <BlogBody mode={"home"}/>
        <Fire/>
        <Plan/>
        {/* <Grass/> */}
        {/* <Updata/> */}
        <Foot/>

    </>
  )
}

export default Home