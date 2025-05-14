import React, { useRef } from 'react'
import Air from '../../components/Air/Air'
import SubscribeBody from '../../components/SubscribeBody/SubscribeBody'
import Taiwan from '../../assets/svg/taiwan.svg?react';
import Asia from '../../assets/svg/asia.svg?react';
import Earth from '../../assets/svg/earth.svg?react';
import Foot from '../../components/Foot/Foot';
import Compare from '../../components/Compare/Compare';

const Subscribe = () => {
  const siblingRef = useRef();
  return (
    <>
        <Air/>
        <SubscribeBody mode="left" svg={Taiwan}  siblingRef={siblingRef} 
          title="本土拾荒者"
          text="我們走遍全台的山林、溪邊與海岸線<br/>撿起那些被風吹雨淋的自然寶藏"
          into="每月贈送台灣自然小物、資源與產地的合照"
        />
        <SubscribeBody mode="right" svg={Asia} siblingRef={siblingRef} 
          title="區域收集者"
          text="我們將穿梭在亞洲各個不同的國家<br/>深入探索並收集那些精美的天然資源"
          into="每月贈送亞洲自然小物、資源與產地的合照、風景明信片、當地伴手禮"
        />
        <SubscribeBody mode="left" svg={Earth} siblingRef={siblingRef} 
          title="地球開拓者"
          text="我們將踏上世界的每一片土地<br/>尋找那些跨越千年仍閃耀的地球遺產"
          into="每月贈送全球自然小物、資源與產地的合照、風景明信片、當地伴手禮、商品打折"
        />
        <div ref={siblingRef}>
          <Compare/>
        </div>
        
        <Foot plan={true}/>
    </>

  )
}

export default Subscribe