import React from 'react'
import Head from '../../components/Head/Head'
import Foot from '../../components/Foot/Foot'
import Air from '../../components/Air/Air'
import { useParams } from 'react-router'
import Goodscard from '../../components/Goodscard/Goodscard'
import { useQuery } from '@tanstack/react-query';
import { fetchStores } from '../../api/firestore/fetchStores'; 


const Goods = () => {
  const {id}=useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['stores'],         // 快取的 key 名稱
    queryFn: fetchStores          // API 函數
  });
  
  const goodsdata = data?.find(item=>item.id ===Number(id) );
  if(!goodsdata){
    return (
      <>
        <div>沒檔案</div>
      </>
    )
  }

  return (
    <>
    <Air/>
    <Goodscard star={goodsdata.star} goodsid={goodsdata.id} category={goodsdata.category} name={goodsdata.name} text={goodsdata.text} price={goodsdata.price} image={goodsdata.image} photos={goodsdata.photos} size={goodsdata.size}/>
    <Foot/>
    </>
  )
}

export default Goods