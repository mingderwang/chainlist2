import React, { useState, useEffect } from 'react';

export default function App({ children, count: initialCount }) {
  const [count, setCount] = useState(initialCount);
  const [meta, setMeta] = useState();
  const add = () => setCount((i) => i + 1);
  const subtract = () => {
      setCount((i) => i > 0 ? i - 1 : i);
  }

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const response = await fetch(
        `https://example-steel-ten.vercel.app/api/v1/chainlist/${count}`
      );
      const json = await response.json()
      console.log(json)
      setMeta(json.meta.name)
    }
  
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [count])

  return (
    <>
      <div className="counter">
        <button onClick={subtract}>-</button>
        <pre>{count}</pre>
        <pre>{meta}</pre>
        <button onClick={add}>+</button>
      </div>
      <div className="counter-message">{children}</div>
    </>
  );
}
