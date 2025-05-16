import React from 'react'
import { useState, useEffect} from "react";
import Air from '../../components/Air/Air'
import { useParams } from 'react-router'
import BlogBodyCard from '../../components/BlogBodyCard/BlogBodyCard'
import Foot from '../../components/Foot/Foot'
import Blogpagebody from '../../components/Blogpagebody/Blogpagebody';
import { useQuery } from '@tanstack/react-query';
import { fetchBlog } from '../../api/firestore/fetchBlog'; 
const Blogpage = () => {
  
  const {id}=useParams();

  const {data,isLoading,isError}=useQuery({
    queryKey:["blog"],
    queryFn:fetchBlog
  })
  
  const blogdata = data?.find(item=>item.blogid === Number(id) );
  if(!blogdata){
    return (
      <>
        <div>沒檔案</div>
      </>
    )
  }

  return (

    <>
     <Air/>
     <Blogpagebody blog={blogdata}/>
    </>
  )
}

export default Blogpage