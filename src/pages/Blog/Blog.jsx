import React from 'react'
import Head from '../../components/Head/Head'
import Foot from '../../components/Foot/Foot'
import Air from '../../components/Air/Air'
import SwiperItem from '../../components/SwiperItem/SwiperItem'
import BlogBody from '../../components/BlogBody/BlogBody'

const Blog = () => {
  return (
    <>
        <Head/>
        <Air/>
        <SwiperItem/>
        <BlogBody mode={"blog"}/>
        <Foot/>
    </>

  )
}

export default Blog