import React from 'react'
import Head from '../../components/Head/Head'
import { useState, useEffect } from "react";
import Big from '../../components/Big/Big';
import Hope from '../../components/Hope/Hope';
import Fire from '../../components/Fire/Fire';
import Plan from '../../components/Plan/Plan';
import Foot from '../../components/Foot/Foot';

const Home = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <>
        <Head/>
        <Big/>
        <Hope/>
        <Fire/>
        <Plan/>
        <Foot/>
        <div>asdasd</div>
        <div>asdasd</div>
        <div>asdasd</div>
        <div>asdasd</div>
        <div>
          <h1>切換主題</h1>
            <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
               切換到 {theme === "light" ? "暗色" : "亮色"} 模式
            </button>
        </div>
    </>
  )
}

export default Home