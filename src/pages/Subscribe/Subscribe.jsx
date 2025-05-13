import React from 'react'
import styles from './Subscribe.module.css'
import Air from '../../components/Air/Air'
import SubscribeBody from '../../components/SubscribeBody/SubscribeBody'
import Taiwan from '../../assets/svg/taiwan.svg?react';
import Asia from '../../assets/svg/asia.svg?react';
import Earth from '../../assets/svg/earth.svg?react';
import Foot from '../../components/Foot/Foot';

const Subscribe = () => {
  return (
    <>
        <Air/>
        <SubscribeBody mode="left" svg={Taiwan} 
          title="本土拾荒者"
          text="我們走遍全台的山林、溪邊與海岸線<br/>撿起那些被風吹雨淋的自然寶藏"
          into="每月贈送台灣自然資源、資源與產地的合照"
        />
        <SubscribeBody mode="right" svg={Asia} 
          title="區域收集者"
          text="我們將穿梭在亞洲各個不同的國家<br/>深入探索並收集那些鮮為人知的珍貴資源"
          into="每月贈送亞洲自然資源、資源與產地的合照、風景明信片、當地伴手禮"
        />
        <SubscribeBody mode="left" svg={Earth} 
          title="地球開拓者"
          text="我們將踏上世界的每一片土地<br/>尋找那些跨越千年仍閃耀光芒的地球遺產"
          into="每月贈送全球自然資源、資源與產地的合照、風景明信片、當地伴手禮、商品打折"
        />
        <Foot plan={true}/>
    </>

  )
}

export default Subscribe