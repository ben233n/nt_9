import React from 'react'
import Head from '../../components/Head/Head'
import Foot from '../../components/Foot/Foot'
import Air from '../../components/Air/Air'
import { useParams } from 'react-router'
import data from '../../../public/json/store.json'
import Goodscard from '../../components/Goodscard/Goodscard'

const Goods = () => {
  const {id}=useParams();

  const goodsdata = data.find(item=>item.id ===Number(id) );
  if(!goodsdata){
    return (
      <>
        <div>沒檔案</div>
      </>
    )
  }

  return (
    <>
    <Head/>
    <Air/>
    <Goodscard name={goodsdata.name} text={goodsdata.text} price={goodsdata.price} img={goodsdata.image} photos={goodsdata.photos} size={goodsdata.size}/>
    <Foot/>
    </>
  )
}

export default Goods