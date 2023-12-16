import React, { useState, useEffect } from 'react';

interface ChainType {
  id: number;
  meta: any;
};

export default function App({ children, count: initialCount }) {
  const [count, setCount] = useState(initialCount);
  const [meta, setMeta] = useState<ChainType>();
  const add = () => setCount((i) => i + 1);
  const subtract = () => {
      setCount((i) => i > 0 ? i - 1 : i);
  }

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const response = await fetch(
        `https://chainlist-api.muzamint.com/api/v1/chainlist/${count}`
      );
      const json = await response.json()
      console.log(json)
      setMeta(json)
    }
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [count])


  return (
    <>
      <div className="counter-message">{children}</div>
      <div className="counter">
        <button onClick={add}>👉</button>
        <button onClick={subtract}>-</button>
      <h2>{count}</h2>  
    {meta ? (
    <>
    <h2>🦄 {Object.entries(meta)[1][1].id}</h2>
    <h2>{Object.entries(meta)[1][1].name}</h2>
    <h2> {JSON.stringify(Object.entries(meta)[1][1].nativeCurrency, null, 2)}</h2>
    </> )
    : <h1>no data</h1>}
    </div>
    </>
  );
}
